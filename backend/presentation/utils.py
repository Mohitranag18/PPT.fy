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

templates for slides => [
  T1 = {{
      "slideNo": ,
      "templateName": "T1",
      "heading": "Heading",
      "subheading": "Sub-Heading",
      "description": "Description"
    }}
  T2 = {{
      "slideNo": ,
      "templateName": "T2",
      "heading": "Heading",
      "points": [
        "point 1",
        "point 2"
      ],
      "image":"example/imageurl"
    }}
  T3 = {{
      "slideNo": ,
      "templateName": "T3",
      "heading": "Heading",
      "topic1": "topic 1 name",
      "points1": [
        "point 1",
        "point 2"
      ],
      "topic2": "topic 2 name",
      "points2": [
        "point 1",
        "point 2"
      ]
    }}
  T4 = {{
      "slideNo": ,
      "templateName": "T4",
      "heading": "Heading",
      "topic": "topic",
      "points": [
        "point 1",
        "point 2"
      ]
    }}
  T5 = {{
      "slideNo": ,
      "templateName": "T5",
      "heading": "Heading",
      "image":"example/imageurl",
      "imageTitle": "title of image"
    }}
  ]


Return the output strictly in the following JSON format (use key 'pdata' which is an array of slides), chose the templates from the above templates, use them according to requirements.

{{
  "pdata": [
    {{
      "slideNo": ,
      "templateName": "T1",
      "heading": "Heading",
      "subheading": "Sub-Heading",
      "description": "Description"
    }},
    {{
      "slideNo": ,
      "templateName": "T2",
      "heading": "Heading",
      "points": [
        "point 1",
        "point 2"
      ],
      "image":"example/imageurl"
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
