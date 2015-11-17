# bootstrap-dynamic-carousel
Add item with image or video (youtube or vimeo), remove item by id, etc
<hr/>
Como o nome e a pequena descrição acima já dizem, este plugin serve para manipular o carousel do Bootstrap de forma dinâmica, além de possibilitar a execução de vídeos do Youtube ou do Vimeo. Quando o slide onde está o vídeo aparece o vídeo inicia automaticamente, e no fim dele o slide passa sozinho.
<hr/>
<h2>Usando</h2>
Primeiro você precisa incluir a biblioteca <a href="http://jquery.com/" targer="_blank">jQuery</a>, e o <a href="//getbootstrap.com">Bootstrap</a>, e depois o arquivo <code>bootstrap-dynamic-carousel.js</code>.
<pre>
<code>
  	var slide = $('#carousel').bootstrapDynamicCarousel({
  		indicators: false
  	});
</code>
</pre>

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
