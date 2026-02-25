
import schemes from "./schemes.json";

export const handler = async (event: any) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { age, state, category, annualIncome, occupation, gender } = body;

    // Rule-based filtering logic (NO AI)
    const matchedSchemes = schemes.filter((scheme: any) => {
      // Income check
      if (scheme.income_limit !== 0 && annualIncome > scheme.income_limit) {
        return false;
      }

      // State check
      if (scheme.state !== "All" && state && scheme.state.toLowerCase() !== state.toLowerCase()) {
        return false;
      }

      // Category check
      if (scheme.category !== "All" && category && !scheme.category.split('/').includes(category)) {
        return false;
      }

      // Gender check
      if (scheme.gender !== "All" && gender && scheme.gender.toLowerCase() !== gender.toLowerCase()) {
        return false;
      }

      // Occupation check
      if (scheme.occupation !== "All" && occupation && scheme.occupation.toLowerCase() !== occupation.toLowerCase()) {
        return false;
      }

      return true;
    }).map((scheme: any) => ({
      scheme_name: scheme.scheme_name,
      benefit: scheme.benefit,
      why_eligible: `Matched based on your ${scheme.income_limit > 0 ? 'income, ' : ''}${scheme.gender !== 'All' ? 'gender, ' : ''}and ${scheme.occupation !== 'All' ? 'occupation' : 'profile'}.`,
      documents_required: scheme.documents_required,
      apply_link: scheme.apply_link
    }));

    return {
      success: true,
      data: matchedSchemes,
      error: null
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || "Internal Server Error"
    };
  }
};
