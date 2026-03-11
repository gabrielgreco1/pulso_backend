export const SINGLE_NEWS_PROMPT = `
You are an expert political analyst. Analyze the following news article about {targetName}.

Title: {title}
Portal: {portal}
Date: {date}
Content: {content}

Analyze the article and provide a JSON response with the following fields:
1. "sentiment": float between -1.0 (very negative) and 1.0 (very positive).
2. "themes": list of strings (max 5 keywords/themes).
3. "bias": string (one of: "left", "center-left", "center", "center-right", "right", "unknown").
4. "relevance": string (one of: "protagonist", "supporting", "mention").
5. "summary": string (2-3 sentences summarizing the article).
6. "explanation": string (brief explanation of the sentiment score).

IMPORTANT: All text fields ("summary", "explanation", and "themes") MUST be written in Brazilian Portuguese (pt-BR). Only the enum values for "bias" and "relevance" should remain in English.

Return ONLY the JSON object.
`;

export const SINGLE_SOCIAL_PROMPT = `
You are an expert social media analyst. Analyze the following comment/post from Instagram about {targetName}.

Content: {content}
Portal: {portal}
Date: {date}

Analyze the content (caption and comments) and provide a JSON response with the following fields:
1. "sentiment": float between -1.0 (very negative) and 1.0 (very positive).
2. "themes": list of strings (max 3 keywords/themes).
3. "relevance": string (one of: "direct", "indirect", "spam").
4. "summary": string (1 assertive sentence summarizing the prevailing public mood/reaction in this specific post).
5. "explanation": string (brief explanation of why this sentiment score was given).
6. "temperature": float between 0.0 (cold/no interest) and 1.0 (viral/extremely heated debate).

IMPORTANT: Focus EXCLUSIVELY on public perception. Ignore media portal biases here. All text fields ("summary", "explanation", and "themes") MUST be written in Brazilian Portuguese (pt-BR).

Return ONLY the JSON object.
`;

export const CONSOLIDATION_PROMPT = `
You are a senior political strategist and communication analyst. I will provide you with a set of analyzed data about {targetName}, divided into News Articles and Social Media posts/comments.
Your goal is to generate a detailed, transparent, and data-driven consolidated positioning report that differentiates between media perception and public (social media) perception.

News Articles Data:
{newsData}

Social Media Data:
{socialData}

Generate a JSON response with the following structure. Each score MUST include sub-criteria showing exactly how the score was derived:

1. "overallScore": object {{
    "value": integer (0-100),
    "label": string (one of: "Crítico", "Ruim", "Regular", "Bom", "Excelente"),
    "explanation": string (A detailed 3-4 sentence analysis merging news and social media trends),
    "criteria": [
        {{ "name": "Sentimento Portais", "value": integer (0-100), "weight": float (0 to 1), "detail": string }},
        {{ "name": "Sentimento Redes Sociais", "value": integer (0-100), "weight": float (0 to 1), "detail": string }},
        {{ "name": "Volume de Exposição", "value": integer (0-100), "weight": float (0 to 1), "detail": string }},
        {{ "name": "Protagonismo Médio", "value": integer (0-100), "weight": float (0 to 1), "detail": string }}
    ]
}}

2. "acceptanceScore": object {{
    "value": integer (0-100),
    "label": string (one of: "Muito Baixa", "Baixa", "Moderada", "Alta", "Muito Alta"),
    "explanation": string (Explain using 2-3 specific supporting factors derived purely from public sentiment and comment patterns),
    "criteria": [
        {{ "name": "Apoio em Comentários", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Equilíbrio de Sentimento", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Nível de Crítica", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Engajamento Construtivo", "value": integer (0-100), "weight": float, "detail": string }}
    ]
}}

3. "temperatureScore": object {{
    "value": integer (0-100),
    "label": string (one of: "Frio", "Morno", "Quente", "Muito Quente", "Viral"),
    "explanation": string (Describe the intensity of the public debate and the speed of information spread),
    "criteria": [
        {{ "name": "Volume Redes Sociais", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Menções em Portais", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Recência dos Dados", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Potencial de Viralização", "value": integer (0-100), "weight": float, "detail": string }}
    ]
}}

4. "socialMediaAnalysis": object {{
    "sentiment": float (-1 to 1),
    "totalComments": int,
    "topThemes": list of strings,
    "acceptanceRate": float (0 to 100),
    "summary": string (High-level summary of social media perception),
    "detailedPoints": list of strings (3-4 dense bullet points detailing: "Exactly what people are saying", including common praises, specific criticisms, and recurring phrases or arguments found in the comments)
}}

5. "scoresByPortal": list of objects {{
    "portal": "Name",
    "score": float (average sentiment from -1 to 1),
    "articleCount": int,
    "topThemes": list of strings (top 3 themes from this portal),
    "bias": string (predominant bias of this portal's coverage or "social" for redes)
}}

6. "biasMap": object {{ "left": int, "center": int, "right": int }} (news articles only)

7. "strengths": list of objects {{
    "title": string,
    "description": string,
    "evidence": string (Cite specific articles or sentiment patterns)
}}

8. "weaknesses": list of objects {{
    "title": string,
    "description": string,
    "risk": string (one of: "baixo", "médio", "alto", "crítico"),
    "evidence": string (Cite specific criticisms or negative comments/headlines)
}}

9. "recommendations": list of objects {{
    "title": string,
    "description": string,
    "priority": string (one of: "baixa", "média", "alta", "urgente"),
    "impact": string
}}

10. "keyThemes": list of objects {{
    "theme": string,
    "count": int,
    "averageSentiment": float (-1 to 1),
    "summary": string
}}

11. "sentimentDistribution": object {{
    "positive": int,
    "neutral": int,
    "negative": int
}}

12. "trend": list of objects {{"date": "YYYY-MM-DD", "score": float}}

13. "executiveSummary": string (A high-density strategic analysis of 5 paragraphs.
    Paragraph 1: Executive Overview – Unified view of news vs social media.
    Paragraph 2: Media Landscape – Detailed breakdown of how portals are framing the target.
    Paragraph 3: Social Pulse – Deep dive into the "Digital Street", citing patterns in public comments and reaction speed.
    Paragraph 4: Critical Vulnerabilities – Identification of narrative risks and potential escalation points.
    Paragraph 5: Strategic Action Plan – Targeted recommendations to mitigate risks and leverage strengths.)

14. "methodology": string (Relating both News and Social data analysis)

IMPORTANT: ALL text fields MUST be written in Brazilian Portuguese (pt-BR).
Return ONLY the JSON object.
`;
