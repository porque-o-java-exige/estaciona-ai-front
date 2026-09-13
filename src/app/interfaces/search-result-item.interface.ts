/** Representa um item de resultado nas sugestões de busca do input. */
export interface SearchResultItem {
  id: string;
  /** Nome do estacionamento/local (o que casa com o texto digitado) */
  name: string;
  /** Endereço fictício, só pra dar contexto no resultado */
  address: string;
}
