export interface ComponentData {
  id: string;
  name: string;
  description: string;
  category: 'atoms' | 'molecules' | 'organisms';
  longDescription: string;
  examples: string[];
}

// (mantido só como comentário de referência — não recrie o array aqui)
// O array COMPONENTS_DATA não fica mais aqui — ele é gerado automaticamente
// a partir dos "component.meta.json" de cada componente. Veja:
// src/app/interfaces/component-data.generated.ts
