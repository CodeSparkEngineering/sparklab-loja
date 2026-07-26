# 📸 Fotos de produtos novos

Larga aqui as fotos dos produtos novos (qualquer nome, qualquer tamanho — telemóvel serve).

## Como funciona

1. **Cria uma subpasta por produto** com um nome simples, ex:
   - `fotos-novas/caneca-benfica/` → mete lá as 1–3 fotos desse produto
   - `fotos-novas/chaveiro-dragao/` → idem
   (ou, se for só 1 produto, larga as fotos soltas aqui mesmo)

2. **Diz ao Claude**, por cada produto:
   - **Nome** (ex: "Caneca Benfica")
   - **Preço** em € (ex: 20)
   - **Categoria** (Canecas, Porta-chaves, Colecionáveis, Caixas, Porta-latas…)
   - **Descrição** curta (1 frase — ou deixa o Claude escrever)
   - **Personalizável?** (ex: nome a gravar, cor à escolha) — sim/não
   - **Material** (se souberes: PLA, PETG… — opcional)

3. O Claude trata do resto: otimiza as imagens (tamanho/peso), renomeia para
   o padrão do site, mete em `public/images/`, adiciona o produto ao catálogo,
   verifica e faz commit + push.

> As fotos que largas aqui **não** vão para o repositório (só as versões finais,
> já otimizadas, em `public/images/`).
