from typing import Dict, List
from pydantic import BaseModel, Field, ValidationError

# COPIED FROM RESEARCH EXTRACTOR, WILL NEED REFACTORING TO PULL FROM SAME PLACE
class ProfessorPage(BaseModel):
    name: str = Field(..., description="Professor's name")
    website: str = Field("N/A", description="Professor's personal website")
    research_interest: List[str] = Field(default_factory=list, description="List of professor's research interests")
    src_url: str = Field(..., description="Source URL of the professor's page")


def load_data():
    """Loads data from supabase storage as a dict"""
    pass

def find_interest_list():
    """THis list goes to the research interests table"""
    pass

def classify_interest(interest):
    """Classifies raw interests into the canonical interest list"""
    pass

def extract_data(data: list[Dict]):
    """
    Split scraped data into professor information and interest information
    """
    professors = []
    prof_interests = []

    try:
        for item in data:
            prof = ProfessorPage.model_validate(item)
            professor_row = (prof.name, prof.website, prof.src_url)
            professors.append(professor_row)

            for interest in prof.research_interest:
                normalized_int = classify_interest(interest)
                prof_interests.append((normalized_int, prof.name))
        print(professors)
        return professors, prof_interests

    except ValidationError as e:
        print(f"Data is invalid format: {e}")
        
if __name__ == "__main__":
    data = [
  {
    "name": "Shameem Ahmed",
    "website": "http://facultyweb.cs.wwu.edu/~ahmeds/",
    "research_interest": [
      "Technology for Autism",
      "Human-Computer Interaction (HCI)",
      "Information and Communication Technology for Development (ICTD)"
    ],
    "src_url": "https://cs.wwu.edu/ahmeds"
  },
  {
    "name": "Yasmine Elglaly",
    "website": "N/A",
    "research_interest": [
      "Accessible Computing",
      "Human-Computer Interaction",
      "Computer Science Education"
    ],
    "src_url": "https://cs.wwu.edu/elglaly"
  },
  {
    "name": "Shri Mare, PhD",
    "website": "https://www.shrirangmare.com/",
    "research_interest": [
      "Security and privacy",
      "Cyber-physical systems",
      "Human-Computer Interaction"
    ],
    "src_url": "https://cs.wwu.edu/mares"
  }]
    extract_data(data)