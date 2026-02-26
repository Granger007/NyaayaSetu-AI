from typing import Dict, Any, List

class SchemeService:
    def __init__(self):
        # Mock data for schemes as in TypeScript handler
        self.mock_schemes = [
            {
                "id": "SCH-001",
                "name": "PM-Kisan Samman Nidhi",
                "description": "Financial assistance to small and marginal farmers.",
                "eligibility": "Land-holding farmers with cultivable land.",
                "benefit": "₹6,000 per year in three installments.",
                "criteria": lambda data: data.get('occupation') == 'farmer' and data.get('annualIncome', 0) < 200000
            },
            {
                "id": "SCH-002",
                "name": "Ayushman Bharat (PM-JAY)",
                "description": "Health insurance for low-income families.",
                "eligibility": "Families listed in SECC 2011 data.",
                "benefit": "₹5 Lakh health cover per family per year.",
                "criteria": lambda data: data.get('annualIncome', 0) < 150000
            },
            {
                "id": "SCH-003",
                "name": "Sukanya Samriddhi Yojana",
                "description": "Savings scheme for the girl child.",
                "eligibility": "Parents of girl child below 10 years.",
                "benefit": "High interest rate and tax benefits.",
                "criteria": lambda data: data.get('age', 0) < 10
            }
        ]

    def get_matched_schemes(self, data: Dict[str, Any]) -> List[Dict[str, Any]]:
        matched_schemes = []
        for scheme in self.mock_schemes:
            if scheme["criteria"](data):
                # Format to match frontend expectations
                scheme_copy = scheme.copy()
                del scheme_copy["criteria"]
                scheme_copy["reasoning"] = "Matched based on your income and occupation profiles."
                matched_schemes.append(scheme_copy)
        return matched_schemes

scheme_service = SchemeService()
