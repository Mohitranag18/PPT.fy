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

Return the output strictly in the following JSON format (use key 'pdata' which is an array of slides):

{{
  "pdata": [
    {{
      "slideNo": 1,
      "templateName": "A1",
      "heading": "Heading",
      "subheading": "Sub-Heading",
      "description": "Description"
    }},
    {{
      "slideNo": 2,
      "templateName": "B1",
      "heading": "Heading",
      "points": [
        "point 1",
        "point 2"
      ]
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
