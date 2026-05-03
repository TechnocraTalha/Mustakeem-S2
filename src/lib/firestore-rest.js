export function parseFirestoreREST(doc) {
  if (!doc || !doc.fields) return {};
  
  function parseValue(val) {
    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return parseInt(val.integerValue, 10);
    if ('doubleValue' in val) return parseFloat(val.doubleValue);
    if ('booleanValue' in val) return val.booleanValue;
    if ('arrayValue' in val) {
      return (val.arrayValue.values || []).map(parseValue);
    }
    if ('mapValue' in val) {
      return parseFirestoreREST({ fields: val.mapValue.fields });
    }
    if ('nullValue' in val) return null;
    return val;
  }

  const result = {};
  for (const [k, v] of Object.entries(doc.fields)) {
    result[k] = parseValue(v);
  }
  return result;
}

export async function getSiteConfigREST(docId) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/site_config/${docId}`;
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // ensures we never cache the response statically
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      console.warn(`Firestore REST error for ${docId}:`, response.status);
      return null;
    }

    const data = await response.json();
    return parseFirestoreREST(data);
  } catch (error) {
    console.error(`Fetch failed for ${docId}:`, error);
    return null;
  }
}
