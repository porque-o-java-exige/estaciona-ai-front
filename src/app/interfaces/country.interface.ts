/** Representa um país disponível para seleção no input de telefone. */
export interface Country {
  /** Código ISO do país (ex: 'BR') */
  code: string;
  /** Nome exibido na listinha de seleção */
  name: string;
  /** Código de discagem, sempre com o "+" na frente (ex: '+55') */
  dialCode: string;
  /** Emoji da bandeira, só pra ficar bonitinho no select */
  flag: string;
}
