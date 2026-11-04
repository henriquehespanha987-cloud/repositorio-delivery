# Prime Burger — importação do HTML enviado
O projeto anterior foi substituído: as 12 páginas, estilos e scripts **recriados** foram removidos da branch `main`.

- `fonte-fornecida.txt`: contém exatamente o código HTML da página inicial fornecido pelo usuário, decodificado da tabela Markdown, sem alterações no conteúdo.
- `index.html`: usa esse HTML de base e acrescenta `<base href="https://primeburguer.delivery/">` para que imagens, CSS e links relativos sejam procurados no domínio original. Pixels de rastreamento e scripts externos que poderiam acionar processos de terceiros foram desativados.

## Limites de fidelidade
O material enviado é só a **página inicial**. Não inclui o código das 12 páginas de produtos, CSS, imagens, scripts de negócio, checkout ou backend. Esses arquivos não puderam ser obtidos pelas ferramentas disponíveis e não foram inventados novamente.

As páginas de produtos são **links externos ao site de origem**, não arquivos locais. O carregamento visual depende da disponibilidade e das permissões do site original. Não existe pagamento integrado nesta cópia.

Para uma cópia integral e independente, envie um ZIP autorizado com as páginas e arquivos originais. Consulte o histórico do GitHub para acessar as versões anteriores, caso necessário.
