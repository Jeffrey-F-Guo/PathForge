from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
# Add the fastapi_services directory to Python path
import sys
import os
from typing import List, Dict

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from shared_utils import llm_init


CAREER_PATHS = [
    "Full-Stack Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "ML Engineer",
    "Mobile Developer",
    "DevOps Engineer",
    "Data Engineer",
    "Game Developer",
    "Embedded Engineer"
]

# add interests
RESEARCH_INTERESTS = [
    "AI",
    "Machine Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Robotics",
    "Autonomous Vehicles",
]

def compile_interests(scraped_data: List[dict]) -> List[str]:
    """
    Compile research interests from scraped data.

    Args:
        scraped_data: List[dict]

    Returns:
        List[str]
    """
    compiled_interests = []
    for professor in scraped_data:
        print(type(professor))
        research_interests = professor.get("research_interest", [])
        print((research_interests))
        compiled_interests.extend(research_interests)
    return compiled_interests

def hehe():
    interests = [
    "Technology for Autism",
    "Human-Computer Interaction (HCI)",
    "Information and Communication Technology for Development (ICTD)",
    "sustainable robotics / robotics for climate",
    "planning algorithms",
    "distributed AI",
    "embodied intelligence",
    "automated robot design",
    "formal methods in robotics",
    "human-robot interfaces and programming languages",
    "embedded systems programming",
    "TCP/IP networking applications",
    "microcontroller application programming",
    "Machine learning",
    "speech and language processing",
    "optimization",
    "cyber security",
    "compliance laws and regulations",
    "Software code intent modeling",
    "secure software development",
    "Hardware acceleration",
    "software reliability",
    "safety",
    "security",
    "human error mechanisms",
    "cognitive mechanisms behind software defects",
    "defect prevention strategies",
    "early defect forecasting",
    "software diversity design",
    "defect detection approaches",
    "learning analytics",
    "educational data mining",
    "machine learning and Artificial Intelligence in education",
    "K−12 computer science education",
    "XR in medical training",
    "Reconfigurable Systems",
    "High-Bandwidth Signal Processing",
    "Radar",
    "Communications",
    "Natural Language Processing in Education and Language Learning",
    "Information Extraction from Social Media Data",
    "Application of Eye-tracking Data for Education and User Authentication",
    "Sensor Network Prediction",
    "Graph Representation",
    "Graphical Features",
    "Machine Learning",
    "Security and privacy",
    "Cyber-physical systems",
    "Human-Computer Interaction",
    "Computational Structural Biology",
    "Big Data",
    "Intelligent Information Systems",
    "Accessible Computing",
    "Human-Computer Interaction",
    "Computer Science Education",
    "internet studies",
    "digital humanities",
    "human-computer interaction & accessibility",
    "design studies",
    "technology studies",
    "risk and compliance assessment",
    "product management",
    "data analytics/visualization",
    "Intellectual Property (IP) strategy consulting",
    "Computational neuroscience",
    "networks",
    "graph theory",
    "applied mathematics",
    "cybersecurity",
    "incident response",
    "risk management",
    "Self-regulatory learning",
    "metacognitive tools",
    "digital games for learning",
    "cybersecurity",
    "blockchain technology",
    "computer networks",
    "algorithmic techniques",
    "combinatorial optimization",
    "game theory",
    "Multi-Party Computation (MPC)",
    "Zero-Knowledge Proofs (ZKPs)",
    "Lightweight Security",
    "Machine Learning",
    "Internet of Things",
    "Computer Science Education",
    "Digital Privacy",
    "Educational robots",
    "Vehicle and Component level Verification/Validation",
    "Parallel and Distributed Computing",
    "Software Systems",
    "File Systems",
    "Unix Programming",
    "Mobile Devices",
    "Human-Computer Interaction (HCI)",
    "Neurodiversity",
    "Interactive Visualization",
    "Affective Computing",
    "Computer vision",
    "Deep learning",
    "Geospatial data",
    "CyberSecurity",
    "Social Computing",
    "Online Deception",
    "Machine Learning",
    "Operating Systems",
    "Distributed Systems",
    "Multimedia and Networking",
    "Computing Education",
    "Human-Computer Interaction",
    "Learning Technologies",
    "security engineering",
    "HCI",
    "Machine Learning",
    "Computer Vision",
    "Computational Photography",
    "Computer Graphics"
  ]
    
    print(len(interests))


# def classify_interests(research_interests: List[str]) -> str:
#     """
#     Classify research interests into a category.
#     """
#     prompt_template = ChatPromptTemplate.from_messages(config.get_llm_prompt())
#     llm_chain = llm_init(prompt_template, Category, model="gemini-2.5-flash-lite", model_provider="google-genai")
#     result = llm_chain.invoke({"research_interests": research_interests})
#     return result


# def classify_career_path(research_interests: List[str]) -> str:
#     """
#     Classify research interests into a category.
#     """
#     prompt_template = ChatPromptTemplate.from_messages(config.get_llm_prompt())
#     llm_chain = llm_init(prompt_template, Category, model="gemini-2.5-flash-lite", model_provider="google-genai")
#     result = llm_chain.invoke({"research_interests": research_interests})
#     return result

if __name__ == "__main__":
    hehe()