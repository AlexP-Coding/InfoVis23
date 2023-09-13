- stratify: data with hierarchy
- geo: paises, etc

- tasks: em grupo. fazer antes da aula; ordem de visita aleatoria. pergunta aleatoria feita e tweak a ser feito individualmente. 3min - 4min (cor depender de variavel diferente, etc)
- datas de entrega: só obrigatorio ir na aula de feedback

- psicologia mudar aula: n é preciso basta carol estar. tens é de levar comprovativo/atestado. nem sequer é preciso vires lol.

- imdb e rotten tomatoes CHEGA. Pode ser algo mais especifico (ex: nr de ferraris no fast and furious)

- até 6as p submeter, feedback na 2a seguinte
- melhoria: até próxima entrega

o python server serve perfeitamente 

fill da barra é budget

- tem de se dizer ao d3 se a informação é string, nr, double...

- pode-se usar react/bootstrap ou outras bibliotecas externas, mas tem de se importar as bibliotecas e n se pode usar para desenhar o vis (só )

- na task1 dara jeito fazer o histograma no "v4"

- var globaldata p dataset p n haver modificaçao qdo se faz reset


svg: design vetorial basicamente
basicamente a mm cena p todos os elementos
"g" = grouping, no "create- append"(l9)
 translae margin é p ficar c margens pretendidas
 - 

 create:
 xScale: diz qtos pixeis corresponde cada "distancia". domain= domínii->range = contradomínio. dá p mudar a escala de linear p logaritmica por exemplo

 scaleBand: qdo há dados categoricos, diz qta distancia e espessura tem cada elemento

 d3 tem lambda functions
 (l16) - elemento a ser visitado atualmente. map normal.
 se houver (d,i) em vez de (d), "i" é o index do item a ser visitado


 na colorScale, o d3 tem já várias paletes predefinidas (d3.interpolateBlues)


 svg
 escalas
 popular com marcas (no caso do Oscars sao retangulos)

 temos de perceber classe q sera apanhada (.bar)

 substituiçao ocorre se se fizer bind de data item a algo que os identifique (ex: title)

 enter(): se a data estiver a entrar no svg, adiciona-se o retangulo

 attr class é p css

 yscale.bandwidth pq se esta a usar band

 ao fazer mousehover procura-se marca associada. qdo se faz mouseout faz reset

.append(title).text(d.>d.title) é tooltip

adicionar escalas.
adicionar labels (rating, oscar year)

desenho é invertido, y cresce p baixo


svg
escala (x,y,r)
marks
eixos
labels


220, what happened w goups

mouseover/mouseout é manmade

in runtime there's transitions
same code as barchart creation
axis get update too

we get auto changes in their public library

wordcloud forbiden

porrda de variaveis categoricas n convem (olha os pkmn....)

balanço entre vars categoricas e quantitativas
pelo menos uma dimensão importante: temporal, geográfica, ou de rede/correlações

n fazer graficos q mudem variedade de atributos a visualizar

marcas = circulos, items= iman, repulsao e atração baseadas na afinidade do valor