<template>
  <!-- Define o rodapé do site com a classe "footer" -->
  <footer class="footer">
    <!-- Container principal do rodapé -->
    <div class="container">
      <!-- Seção do rodapé com informações do CineExpress -->
      <div class="footer-section">
        <h4>CineExpress</h4> <!-- Cabeçalho com o nome "CineExpress" -->
        <p>© 2025 CineExpress.</p> <!-- Parágrafo indicando os direitos autorais de 2025 -->
        <p>Todos os direitos reservados.</p> <!-- Parágrafo indicando que todos os direitos estão reservados -->
      </div>
      <!-- Seção do rodapé com os créditos -->
      <div class="footer-credit">
        <p>Desenvolvido por CineExpress Team</p> <!-- Parágrafo indicando que o site foi desenvolvido pela equipe do CineExpress -->
      </div>
    </div>
  </footer>
</template>
  
<style scoped>
  /* Estilos aplicados ao componente do rodapé */
  .footer {
    background-color: #2c2c2c; /* Cor de fundo do rodapé */
    color: white; /* Cor do texto */
    padding: 20px; /* Espaçamento interno ao redor do conteúdo do rodapé */
    text-align: center; /* Alinha o texto no centro do rodapé */
  }
  .container {
    max-width: 1200px; /* Largura máxima do container */
    margin: auto; /* Centraliza o container horizontalmente */
    display: flex; /* Define um layout flexível para o container */
    flex-wrap: wrap; /* Permite que os itens flexíveis "quebrem" para a próxima linha se necessário */
    justify-content: space-between; /* Espaça os itens uniformemente, com espaço entre eles */
  }
  .footer-section {
    flex: 1; /* Permite que a seção cresça para preencher o espaço disponível */
    min-width: 250px; /* Largura mínima da seção */
  }
  .footer-credit {
    margin-top: 20px; /* Margem superior */
    width: 100%; /* Largura completa */
  }
</style>