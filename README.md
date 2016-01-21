# bootstrap-dynamic-carousel
Add item with image or video (youtube or vimeo), remove item by id, etc
<hr/>
<h3><a href="http://jayralencar.com.br/exemplos/bootstrap-dynamic-carousel/">DEMO</a></h3>
<hr/>
Como o nome e a pequena descrição acima já dizem, este plugin serve para manipular o carousel do Bootstrap de forma dinâmica, além de possibilitar a execução de vídeos do Youtube ou do Vimeo. Quando o slide onde está o vídeo aparece o vídeo inicia automaticamente, e no fim dele o slide passa sozinho.
<hr/>
<h2>Usando</h2>
Primeiro você precisa incluir a biblioteca <a href="http://jquery.com/" targer="_blank">jQuery</a>, e o <a href="//getbootstrap.com">Bootstrap</a>, e depois o arquivo <code>bootstrap-dynamic-carousel.js</code>.
```js
var slide = $('#carousel').bootstrapDynamicCarousel({
	indicators: false
});
```

A biblioteca aceita alguns parametros na sua instancia, são eles:
<table>
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Tipo</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>interval</td>
      <td>inteiro</td>
      <td>Serve para dizer o tempo em milesimos que o slider irá demorar para passar para o próximo.</td>
    </tr>
     <tr>
      <td>controls</td>
      <td>boolean</td>
      <td>Para informar se os controles do carousel serão mostrados ou não</td>
    </tr>
     <tr>
      <td>indicators</td>
      <td>boolean</td>
      <td>Para informar se os indicatores do carousel serão mostrados ou não</td>
    </tr>
  </tbody>
</table>

<h3>addItem(options)</h3>
Este método serve para adicionar um novo item ao carousel, como o nome sugere. Você pode inserir imagens ou vídeos passando nos parametros o tipos e outros dados importantes, veja abaixo a lista de parametros:
<table>
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Tipo</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>texto</td>
      <td>Diz respeito ao Id do item, com este id você poderá remover o item mais tarde se assim desejar.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>texto</td>
      <td>Aqui você pode informar o tipo do item, sendo <strong>image, youtube ou vimeo</strong></td>
    </tr>
    <tr>
      <td>url</td>
      <td>texto</td>
      <td>O endereço do arquivo que será mostrado no caso de imagem, se for vídeo aqui deve ir o link do vídeo, seja youtube ou vimeo</td>
    </tr>
    <tr>
      <td>href</td>
      <td>texto</td>
      <td>Endereço para a onde o usuário será redirecionado caso clique na imagem</td>
    </tr>
    <tr>
      <td>caption</td>
      <td>texto</td>
      <td>Texto que será mostrado no slide como caption</td>
    </tr>
    <tr>
      <td>captionTag</td>
      <td>texto</td>
      <td>Tag na qual o caption irá aparecer. Por exemplo se você informar h3, o caption irá ser mostrado no tamanho H3</td>
    </tr>
    <tr>
      <td>active</td>
      <td>boolean</td>
      <td>Para dizer qual item deve estar ativo. O item a ser ativo será sempre o útimo que tiver este atributo verdadeido</td>
    </tr>
  </tbody>
</table>
Veja abaixo exemplos de como adicionar items:
```js
//Criando elemento
var slide = $('#carousel').bootstrapDynamicCarousel({
	indicators: false
});

//Adicionando imagens
slide.addItem({
	id: 'myID',
	type: 'image',
	url: 'http://clubedosgeeks.com.br/wp-content/uploads/2015/11/dynamic.fw_-1270x7931-720x340.png',
	href: 'http://clubedosgeeks.com.br/web-design/jquery/abas-dinamicas-com-boostrap-abrir-fechar-e-arrastar',
	caption: 'Plugin to add, remove and move Bootstrap tabs',
	captionTag: 'h3',
	active: true
});
	
//Adicionando vídeo do youtube
slide.addItem({
	type: 'youtube',
	url: 'https://www.youtube.com/watch?v=uWPMevZbn-s'
});
	
//adicionando vídeo do VIMEO
slide.addItem({
	type: 'vimeo',
	url: 'https://vimeo.com/76979871'
});
```
<h3>removeById(itemid)</h3>
Método para remover itens do carousel pelo id do item, para usar este método é importante informar o id do item ao adicionar. Veja a forma de usar:
```js
    slide.removeById('myID');
```
