# Partida U-39 Concept — Avaliação CIC avançada

técnico-pedagógico, destinada a estudo de J-3901, J-3902 e conversor.

## Entregas e alterações

- **30 questões CIC totalmente reescritas**, sendo 8 sobre J-3901, 12 sobre J-3902 e 10 sobre o conversor. Sete questões são classificadas como Intermediário e 23 como Avançado CIC.
- Cada questão apresenta **4 alternativas relacionadas ao mesmo fenômeno, equipamento ou decisão**, diferenciadas por valores, instantes, instrumentos, modos, lógica de permissivos ou grau de certeza documental.
- Em vez de considerar a opção mais longa ou deslocada do tema como pista, o banco foi revisado quanto a semelhança textual: diferença máxima de 27 caracteres entre alternativas de uma questão; correta estritamente mais longa em 5 de 30 questões.
- Antes de confirmar, o usuário pode selecionar/trocar a resposta, consultar uma **pista de análise** que não revela o gabarito e indicar se está **confiante** ou **em dúvida**.
- **Modo Estudo:** correção imediatamente após confirmação, explicação técnica e quadro que compara as quatro alternativas. **Modo Desafio CIC:** mantém o gabarito oculto até terminar a prova.
- Revisão final mostra a alternativa escolhida, justificativa da escolha, resposta fundamentada, comparação entre todas as opções e a página do documento. Acertos respondidos com dúvida aparecem como pontos de estudo, sem perder pontuação.
- **Gabarito individual por questão**, corrigido em função do embaralhamento; armazenamento local versionado em `u39-v31-quiz-advanced-key`, sem aproveitamento dos registros da avaliação anterior.

## Conteúdo preservado

- PDF original das 76 páginas em `procedimento-original-U39.pdf`.
- Transcrição pesquisável em `document-data.js`.
- Módulos técnicos J-3901, J-3902, conversor, rampas, leitor integral, laboratório CIC com 40 decisões, sinótico e causa/efeito.
- Os arquivos citados acima foram comparados por SHA-256 com a V3 e não foram alterados.

## Prévia sem GitHub

Acesse o arquivo **`Partida-U39-Concept-V3.1-Previa-Interativa.html`**, fornecido separadamente. Ele incorpora PDF, scripts, estilos e miniaturas em um único HTML. A visualização depende da capacidade do aplicativo/navegador de executar HTML local; não pode instalar PWA a partir da prévia.

## Publicação no GitHub Pages

Coloque o **conteúdo** do ZIP na raiz do repositório, mantendo `index.html`, `.js`, `.css`, `assets/`, `manifest.webmanifest`, `service-worker.js` e o PDF. Depois habilite Pages em HTTPS. A versão PWA só pode ser avaliada integralmente em HTTPS/localhost.

## Validações disponíveis

- JavaScript validado com `node --check`.
- Lógica de 30 questões validada em 300 embaralhamentos: **9.000 correções de respostas certas e 9.000 de respostas erradas**, todas consistentes.
- Distribuição das posições corretas por tentativa: **8 A, 8 B, 7 C, 7 D**.
- Estado parcial de alternativa e confiança testado quanto à serialização em armazenamento local.
- Vínculos de questões com páginas de 1 a 76 e quatro justificativas verificadas.
- A tentativa de validação visual do navegador neste ambiente foi bloqueada por restrição administrativa. Portanto, responsividade visual e instalação real exigem conferência após abertura em navegador compatível.

**Situação:** material para treinamento e revisão pedagógica; não homologado para execução de partida real.
