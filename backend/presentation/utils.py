import google.generativeai as genai
import json
import re
from django.conf import settings

# Configure the Gemini API key
genai.configure(api_key=settings.GOOGLE_GEMINI_API_KEY)

def generate_presentation_content(prompt, number_of_slides, use_case="Education", theme="Minimal"):
    # Define theme-based styling guidelines
    theme_styles = {
        "Minimal": {
            "primary_font": "Arial",
            "heading_size": 32,
            "subheading_size": 24,
            "text_size": 20,
            "primary_color": "#333333",
            "accent_color": "#666666",
            "style_description": "clean, simple design with plenty of whitespace, minimal colors, and subtle styling"
        },
        "Modern": {
            "primary_font": "Helvetica",
            "heading_size": 34,
            "subheading_size": 26,
            "text_size": 22,
            "primary_color": "#2C3E50",
            "accent_color": "#3498DB",
            "style_description": "contemporary design with bold typography, vibrant colors, and sleek aesthetics"
        },
        "Corporate": {
            "primary_font": "Calibri",
            "heading_size": 30,
            "subheading_size": 24,
            "text_size": 18,
            "primary_color": "#1F2937",
            "accent_color": "#4F46E5",
            "style_description": "professional business appearance with conservative colors and formal typography"
        },
        "Playful": {
            "primary_font": "Comic Sans MS",
            "heading_size": 36,
            "subheading_size": 28,
            "text_size": 24,
            "primary_color": "#FF6B6B",
            "accent_color": "#4ECDC4",
            "style_description": "fun and energetic design with bright colors, playful fonts, and creative elements"
        },
        "Classic": {
            "primary_font": "Times New Roman",
            "heading_size": 32,
            "subheading_size": 24,
            "text_size": 20,
            "primary_color": "#2D3748",
            "accent_color": "#744210",
            "style_description": "traditional and timeless design with serif fonts and classic color schemes"
        },
        "Elegant": {
            "primary_font": "Georgia",
            "heading_size": 34,
            "subheading_size": 26,
            "text_size": 22,
            "primary_color": "#1A202C",
            "accent_color": "#805AD5",
            "style_description": "sophisticated and refined design with elegant typography and luxurious color palette"
        },
        "Bold": {
            "primary_font": "Impact",
            "heading_size": 38,
            "subheading_size": 30,
            "text_size": 24,
            "primary_color": "#E53E3E",
            "accent_color": "#DD6B20",
            "style_description": "strong and impactful design with bold fonts, high contrast colors, and dramatic styling"
        }
    }

    # Define use case specific guidelines
    use_case_guidelines = {
        "Education": "Focus on clear explanations, learning objectives, and educational content structure. Use diagrams and visual aids to enhance understanding.",
        "Pitch Deck": "Emphasize problem-solution narrative, market opportunity, business model, and compelling value propositions. Include data visualization and investor-focused content.",
        "Workshop": "Structure content for interactive sessions, include actionable takeaways, hands-on activities, and participant engagement elements.",
        "Report": "Present data-driven insights, analytical findings, recommendations, and executive summary format with supporting evidence.",
        "Business": "Focus on professional communication, strategic objectives, performance metrics, and stakeholder-relevant information.",
        "Personal": "Tailor content for individual expression, personal stories, achievements, or informal presentations with a personal touch.",
        "Other": "Create versatile content that can be adapted for various presentation contexts and audiences."
    }

    current_theme = theme_styles.get(theme, theme_styles["Minimal"])
    current_use_case = use_case_guidelines.get(use_case, use_case_guidelines["Education"])

    formatted_prompt = f"""
    You are an expert presentation creator. Generate a {number_of_slides}-slide presentation about the following topic:

    \\"{prompt}\\"

    **PRESENTATION CONTEXT:**
    - Use Case: {use_case}
    - Theme: {theme}
    - Use Case Guidelines: {current_use_case}
    - Theme Style: {current_theme['style_description']}

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
            }}
          }}
        }}
      T7 = {{
          "slideNo": ,
          "templateName": "T7",
          "heading": "Heading",
          "chartType": {{
            "graph": {{
              "code": "Matplotlib code for graph (include x and y axis labels)",
              "description": "Description of the graph"
            }},
          }}
        }}
    ]

    **STYLING INSTRUCTIONS:**
    - Apply {theme} theme styling throughout the presentation
    - Use primary font: {current_theme['primary_font']}
    - Heading font size: {current_theme['heading_size']}px
    - Subheading font size: {current_theme['subheading_size']}px  
    - Text font size: {current_theme['text_size']}px
    - Primary color: {current_theme['primary_color']}
    - Accent color: {current_theme['accent_color']}
    - Style approach: {current_theme['style_description']}

    Instructions:
    - Generate **dynamic styles** for `heading`, `subheading`, `points`, `topics`, `description`, and `imageTitle` in the output JSON.
      Each text field should have a `style` dictionary like: 
      {{
        "font": "{current_theme['primary_font']}", 
        "fontSize": {current_theme['heading_size']}, 
        "color": "{current_theme['primary_color']}", 
        "bold": true, 
        "italic": false
      }}
    - Adapt font sizes based on element type (headings larger, points smaller)
    - Use the specified theme colors and maintain consistency
    - Structure content according to the {use_case} use case guidelines
    - For fields that contain `image`, add an additional key `"imageTags"`, which should be a list of 3-5 dynamic keywords describing the image context based on the content.
    - Styles and imageTags should be generated **only in the output**, not inside the templates.
    - For type="flowchart": Provide the Mermaid code (flowchart, sequence, basic graph). **IMPORTANT: Always enclose text within nodes in double quotes.** For example, use `A[\\"Node Text\\"]` or `B{{\\"Node Text with {{braces}}\\"}}` instead of `A[Node Text]` or `B{{Node Text}}`. This ensures correct parsing of special characters.
    - For type="graph": Provide a JSON string containing data for plotting. The JSON object MUST have keys: `"chart_type"` (string, e.g., "bar", "line"), `"labels"` (list of strings), `"values"` (list of numbers), **`"title"` (string, a specific descriptive title for the chart)**, **`"x_axis_label"` (string, REQUIRED label for the X-axis)**, and **`"y_axis_label"` (string, REQUIRED label for the Y-axis)**. Example: `{{\\"chart_type\\": \\"bar\\", \\"title\\": \\"Monthly Sales Growth\\", \\"labels\\": [\\"Jan\\", \\"Feb\\", \\"Mar\\"], \\"values\\": [15, 22, 18], \\"x_axis_label\\": \\"Month\\", \\"y_axis_label\\": \\"Sales\\"}}`.

    Return the output strictly in the following JSON format:

    {{
      "pdata": [
        {{
          "slideNo": 1,
          "templateName": "T2",
          "heading": {{
            "text": "Heading text here",
            "style": {{
              "font": "{current_theme['primary_font']}",
              "fontSize": {current_theme['heading_size']},
              "color": "{current_theme['primary_color']}",
              "bold": true,
              "italic": false
            }}
          }},
          "points": [
            {{
              "text": "First point",
              "style": {{
                "font": "{current_theme['primary_font']}",
                "fontSize": {current_theme['text_size']},
                "color": "{current_theme['accent_color']}",
                "bold": false,
                "italic": false
              }}
            }},
            {{
              "text": "Second point",
              "style": {{
                "font": "{current_theme['primary_font']}",
                "fontSize": {current_theme['text_size']},
                "color": "{current_theme['accent_color']}",
                "bold": false,
                "italic": false
              }}
            }}
          ],
          "image": "example/imageurl",
          "imageTags": ["finance", "digital currency", "blockchain"]
        }}
      ]
    }}

    Ensure the total number of slides is exactly {number_of_slides}.
    Tailor the content structure and messaging to fit the {use_case} use case.
    Apply consistent {theme} theme styling throughout all slides.
    """

    model = genai.GenerativeModel("gemini-2.0-flash")
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
