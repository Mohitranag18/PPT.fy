import google.generativeai as genai
import json
import re
from django.conf import settings

# Configure the Gemini API key
genai.configure(api_key=settings.GOOGLE_GEMINI_API_KEY)

def generate_presentation_content(prompt, number_of_slides):
    formatted_prompt = f"""
You are an expert presentation creator. Generate a {number_of_slides}-slide presentation about the following topic:

\"{prompt}\"

Templates for slides => [
  T1 = {{
      "slideNo": ,
      "templateName": "T1",
      "heading": "Heading",
      "subheading": "Sub-Heading",
      "description": "Description"
    }},
  T2 = {{
      "slideNo": ,
      "templateName": "T2",
      "heading": "Heading",
      "points": [
        "point 1",
        "point 2"
      ],
      "image": "example/imageurl"
    }},
  T3 = {{
      "slideNo": ,
      "templateName": "T3",
      "heading": "Heading",
      "topic1": "Topic 1",
      "points1": [
        "point 1",
        "point 2"
      ],
      "topic2": "Topic 2",
      "points2": [
        "point 1",
        "point 2"
      ]
    }},
  T4 = {{
      "slideNo": ,
      "templateName": "T4",
      "heading": "Heading",
      "topic": "Topic",
      "points": [
        "point 1",
        "point 2"
      ]
    }},
  T5 = {{
      "slideNo": ,
      "templateName": "T5",
      "heading": "Heading",
      "image": "example/imageurl",
      "imageTitle": "Title of Image"
    }},
  T6 = {{
      "slideNo": ,
      "templateName": "T6",
      "heading": "Heading",
      "chartType": {{
        "flowchart": {{
          "code": "Mermaid syntax code for flowchart (ensure no syntax errors)",
          "description": "Description of the flowchart"
        }},
        "graph": {{
          "code": "Matplotlib code for graph (include x and y axis labels)",
          "description": "Description of the graph"
        }},
        "latex": {{
          "equation": "LaTeX formatted equation",
          "description": "Description of the equation"
        }}
      }}
    }}
]

Instructions:
- Generate **dynamic styles** for `heading`, `subheading`, `points`, `topics`, `description`, and `imageTitle` in the output JSON.
  Each text field should have a `style` dictionary like: 
  {{
    "font": "Arial", 
    "fontSize": 24, 
    "color": "#000000", 
    "bold": true, 
    "italic": false
  }}
- For fields that contain `image`, add an additional key `"imageTags"`, which should be a list of 3-5 dynamic keywords describing the image context based on the content.
- Styles and imageTags should be generated **only in the output**, not inside the templates.

Return the output strictly in the following JSON format:

{{
  "pdata": [
    {{
      "slideNo": 1,
      "templateName": "T2",
      "heading": {{
        "text": "Heading text here",
        "style": {{
          "font": "Arial",
          "fontSize": 32,
          "color": "#123456",
          "bold": true,
          "italic": false
        }}
      }},
      "points": [
        {{
          "text": "First point",
          "style": {{
            "font": "Calibri",
            "fontSize": 24,
            "color": "#654321",
            "bold": false,
            "italic": false
          }}
        }},
        {{
          "text": "Second point",
          "style": {{
            "font": "Calibri",
            "fontSize": 24,
            "color": "#654321",
            "bold": false,
            "italic": false
          }}
        }}
      ],
      "image": "example/imageurl",
      "imageTags": ["finance", "digital currency", "blockchain"]
    }},
    {{
      "slideNo": 2,
      "templateName": "T6",
      "heading": {{
        "text": "Understanding the Process",
        "style": {{
          "font": "Verdana",
          "fontSize": 28,
          "color": "#112233",
          "bold": true,
          "italic": false
        }}
      }},
      "chartType": {{
        "flowchart": {{
          "code": "graph TD; A[\"Start\"] --> B[\"Process\"] --> C[\"End\"]",
          "description": "This flowchart illustrates the basic process flow from start to end."
        }},
        "graph": {
          "chart_type": "bar",
          "labels": ["Category A", "Category B", "Category C"],
          "values": [10, 20, 30],
          "title": "Distribution of Categories",
          "x_axis_label": "Categories",
          "y_axis_label": "Values"
        },
        "latex": {{
          "equation": "x = \\frac{{-b \\pm \\sqrt{{b^2 - 4ac}}}}{{2a}}",
          "description": "The quadratic formula used to find the roots of a quadratic equation."
        }}
      }}
    }}
  ]
}}

Ensure the total number of slides is exactly {number_of_slides}.
"""


    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(formatted_prompt)

    if not response or not response.text:
        raise ValueError("Empty AI response received.")

    # Clean markdown-style code block markers
    cleaned_response = re.sub(r"```(?:json)?\n|\n```", "", response.text.strip())

    try:
        parsed = json.loads(cleaned_response)
        return parsed.get("pdata")  # Return only 'pdata' array
    except json.JSONDecodeError as e:
        raise ValueError("Failed to parse AI response as JSON.") from e
