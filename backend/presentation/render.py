"""
!pip install python-mermaid
!npm install -g @mermaid-js/mermaid-cli
!which mmdc (to check MERMAID_CLI_PATH)
!apt install chromium-chromedriver

!apt install msttcorefonts -qq
!rm ~/.cache/matplotlib -rf
"""

import logging
import subprocess
import os
import tempfile
from dotenv import load_dotenv


import matplotlib.pyplot as plt
from typing import Optional, Dict, Any

load_dotenv()
logger = logging.getLogger(__name__)

MERMAID_CLI_PATH = os.getenv("MERMAID_CLI_PATH")
DEFAULT_WIDTH = 1920
DEFAULT_HEIGHT = 1080
DEFAULT_THEME = "neutral"
DEFAULT_BG_COLOR = "transparent"

# Chart Styling Configuration
CHART_BG_COLOR = "#121212"
CHART_TEXT_COLOR = "#f0f0f0"
CHART_TITLE_COLOR = "#ffffff"
CHART_PRIMARY_COLOR = "#ffd700" # Yellow for bars/lines
CHART_SECONDARY_COLOR = "#ff4c4c"
CHART_FONT_FAMILY = "Inter"
CHART_FONT_SIZE_TITLE = 18
CHART_FONT_SIZE_LABEL = 14
CHART_FONT_SIZE_TICKS = 14 # tick label size for visibility
CHART_DPI = 150 # Higher DPI for better quality PNG

def _render_mermaid_diagram(mermaid_code: str, output_filepath: str, temp_dir: str) -> bool:
    """Internal function to render Mermaid code to PNG."""
    temp_mmd_filepath = None
    try:
        # Ensure code is stripped before writing
        cleaned_mermaid_code = mermaid_code.strip()
        if not cleaned_mermaid_code:
             return False

        with tempfile.NamedTemporaryFile(mode='w', suffix='.mmd', dir=temp_dir, delete=False, encoding='utf-8') as temp_mmd_file:
            temp_mmd_filepath = temp_mmd_file.name
            temp_mmd_file.write(cleaned_mermaid_code)
        logger.info(f"Created temporary Mermaid file: {temp_mmd_filepath}")

        command = [
            MERMAID_CLI_PATH,
            "-i", temp_mmd_filepath,
            "-o", output_filepath,
            "-w", str(DEFAULT_WIDTH),
            "-H", str(DEFAULT_HEIGHT),
            "-t", DEFAULT_THEME,
            "-b", DEFAULT_BG_COLOR,
            "-p", "puppeteer-config.json",
        ]

        logger.info(f"Executing Mermaid CLI command: {' '.join(command)}")
        result = subprocess.run(command, capture_output=True, text=True, check=False, encoding='utf-8', errors='replace')

        if result.returncode == 0:
            logger.info(f"Successfully rendered Mermaid diagram to {output_filepath}")
            return True
        else:
            logger.error(f"Mermaid CLI failed (Return Code: {result.returncode})")
            logger.error(f"Stderr: {result.stderr.strip()}")
            logger.error(f"Stdout: {result.stdout.strip()}")
            return False

    except Exception as e:
        logger.error(f"An unexpected error occurred during Mermaid rendering: {e}")
        return False
    finally:
        if temp_mmd_filepath and os.path.exists(temp_mmd_filepath):
            try:
                os.remove(temp_mmd_filepath)
                logger.info(f"Cleaned up temporary Mermaid file: {temp_mmd_filepath}")
            except OSError as e:
                logger.warning(f"Failed to clean up temporary Mermaid file {temp_mmd_filepath}: {e}")


""""example usage: 

mermaid_code = \"""
   graph LR
   A[Start] --> B{Process};
   B --> C(End);
   \"""
output_filepath = 'my_diagram.png'
temp_dir = '/tmp'
success = _render_mermaid_diagram(mermaid_code, output_filepath, temp_dir)
if success:
       print(f"Diagram rendered to {output_filepath}")
else:
       print("Diagram rendering failed.")
"""


def _render_matplotlib_chart(chart_data: Dict[str, Any], output_filepath: str) -> bool:
    """Internal function to render chart data using Matplotlib."""

    chart_type = chart_data.get("chart_type", "bar")
    labels = chart_data.get("labels", [])
    values = chart_data.get("values", [])
    title = chart_data.get("title")
    x_label = chart_data.get("x_axis_label")
    y_label = chart_data.get("y_axis_label")

    if not title:
        logger.error(f"Missing 'title' in chart_data.")
        return False
    if not labels or not values or len(labels) != len(values):
        logger.error(f"Invalid chart data: Labels/values mismatch or missing.")
        return False

    fig, ax = plt.subplots(figsize=(8, 6), dpi=CHART_DPI)
    fig.patch.set_facecolor(CHART_BG_COLOR)
    ax.set_facecolor(CHART_BG_COLOR)

    # Apply styling
    plt.rcParams.update({
        'font.family': CHART_FONT_FAMILY,
        'font.size': CHART_FONT_SIZE_LABEL,
        'text.color': CHART_TEXT_COLOR,
        'axes.labelcolor': CHART_TEXT_COLOR,
        'axes.edgecolor': CHART_TEXT_COLOR,
        'xtick.color': CHART_TEXT_COLOR,
        'ytick.color': CHART_TEXT_COLOR,
        'axes.titlecolor': CHART_TITLE_COLOR,
        'figure.facecolor': CHART_BG_COLOR,
        'axes.facecolor': CHART_BG_COLOR,
        'savefig.facecolor': CHART_BG_COLOR,
        'savefig.edgecolor': CHART_BG_COLOR,
    })

    # Plot based on type
    try:
        if chart_type == "bar":
            ax.bar(labels, values, color=CHART_PRIMARY_COLOR)
            ax.tick_params(axis='x', rotation=45)
        elif chart_type == "line":
            ax.plot(labels, values, marker='o', linestyle='-', color=CHART_PRIMARY_COLOR)
            ax.tick_params(axis='x', rotation=45)
        elif chart_type == "pie":
            colors = plt.cm.viridis([i/len(labels) for i in range(len(labels))])
            ax.pie(values, labels=labels, autopct='%1.1f%%', startangle=90, colors=colors, textprops={'color': CHART_TEXT_COLOR})
            ax.axis('equal') 
        else:
            logger.error(f"Unsupported chart_type '{chart_type}'.")
            plt.close(fig)
            return False

        ax.set_title(title, fontsize=CHART_FONT_SIZE_TITLE, color=CHART_TITLE_COLOR, weight='bold')

        ax.grid(axis='y', color=CHART_TEXT_COLOR, linestyle='--', linewidth=0.5, alpha=0.5)
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['left'].set_color(CHART_TEXT_COLOR)
        ax.spines['bottom'].set_color(CHART_TEXT_COLOR)

        if x_label:
            ax.set_xlabel(x_label, fontsize=CHART_FONT_SIZE_LABEL, color=CHART_TEXT_COLOR)
        if y_label:
            ax.set_ylabel(y_label, fontsize=CHART_FONT_SIZE_LABEL, color=CHART_TEXT_COLOR)

        ax.tick_params(axis='both', which='major', labelsize=CHART_FONT_SIZE_TICKS, labelcolor=CHART_TEXT_COLOR)


        plt.tight_layout()
        plt.savefig(output_filepath, dpi=CHART_DPI, transparent=False)
        plt.close(fig)
        logger.info(f"Successfully rendered {chart_type} chart to {output_filepath}")
        return True

    except Exception as e:
        logger.error(f"Failed to render Matplotlib chart: {e}", exc_info=True)
        if 'fig' in locals() and plt:
             plt.close(fig)
        return False


"""
example usage:

output_filepath = "my_chart.png"
success = _render_matplotlib_chart(chart_data, output_filepath)

if success:
    print(f"Chart rendered to {output_filepath}")
else:
    print("Chart rendering failed.")

"""