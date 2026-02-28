import os
import re

base_dir = "/Users/psama0214/Hackathon-New/EPCID/src"

def fix_phenotype():
    path = os.path.join(base_dir, "agents/phenotype_agent.py")
    with open(path, "r") as f: content = f.read()
    content = content.replace("def __post_init__(self):", "def __post_init__(self) -> None:")
    with open(path, "w") as f: f.write(content)

def fix_ingestion():
    path = os.path.join(base_dir, "agents/ingestion_agent.py")
    with open(path, "r") as f: content = f.read()
    content = content.replace("normalized = {}", "normalized: dict[str, Any] = {}")
    content = content.replace("validations = []", "validations: list[ValidationResult] = []")
    content = content.replace("warnings = []", "warnings: list[str] = []")
    
    # 647: error: Need type annotation for "validations" (hint: "validations: list[<type>] = ...")
    content = content.replace("validations = []\\n        warnings = []", "validations: list[ValidationResult] = []\\n        warnings: list[str] = []")
    
    with open(path, "w") as f: f.write(content)


def fix_weather():
    path = os.path.join(base_dir, "services/weather_service.py")
    with open(path, "r") as f: content = f.read()
    
    # fix the extend issues by using tmp lists
    old_guidance = """        guidance = {
            "temperature_guidance": self._get_temperature_guidance(weather.temperature_f),
            "humidity_guidance": self._get_humidity_guidance(weather.humidity_percent),
            "overall_risk": "low",
            "recommendations": [],
            "symptoms_to_watch": [],
        }"""
        
    new_guidance = """        recs: list[str] = []
        symps: list[str] = []
        guidance: dict[str, Any] = {
            "temperature_guidance": self._get_temperature_guidance(weather.temperature_f),
            "humidity_guidance": self._get_humidity_guidance(weather.humidity_percent),
            "overall_risk": "low",
            "recommendations": recs,
            "symptoms_to_watch": symps,
        }"""
    content = content.replace(old_guidance, new_guidance)
    content = content.replace('guidance["recommendations"].extend(', 'recs.extend(')
    content = content.replace('guidance["symptoms_to_watch"].extend(', 'symps.extend(')
    content = content.replace('guidance["recommendations"].append(', 'recs.append(')
    content = content.replace('guidance["symptoms_to_watch"].append(', 'symps.append(')
    
    # Need type annotation for "daily" (hint: "daily: dict[<type>, <type>] = ...")
    content = content.replace("daily = {}", "daily: dict[str, dict[str, list[Any]]] = {}")
    
    with open(path, "w") as f: f.write(content)


if __name__ == "__main__":
    fix_phenotype()
    fix_ingestion()
    fix_weather()
    print("Fixed common files.")
