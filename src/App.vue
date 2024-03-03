<template>
  <div id="app" class="container mt-4">
    <h1 class="mb-4">Cadastro de Clientes e Produtos</h1>

    <!-- Navegação em Abas -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <!-- Adicionando o evento @click para mudar a aba ativa -->
        <a class="nav-link" @click="currentTab = 'cadastro'" :class="{ 'active': currentTab === 'cadastro' }">Cadastro</a>
      </li>
      <li class="nav-item" role="presentation">
        <!-- Adicionando o evento @click para mudar a aba ativa -->
        <a class="nav-link" @click="currentTab = 'edicao'" :class="{ 'active': currentTab === 'edicao' }">
          <i class="fas fa-lock"></i> Edição
        </a>
      </li>
    </ul>

    <!-- Conteúdo das Abas -->
    <div class="tab-content" id="myTabContent">
      <!-- Aba de Cadastro -->
      <div v-if="currentTab === 'cadastro'">
        <!-- Conteúdo da aba de cadastro -->
        <!-- Cadastro de Produtos -->
        <div class="mb-4">
          <h2>Cadastro de Produtos</h2>
          <div class="form-group">
            <input type="text" class="form-control" v-model="produto.nome" placeholder="Nome do Produto" autofocus>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="produtoAtivo" v-model="produto.ativo">
            <label class="form-check-label" for="produtoAtivo">Ativo</label>
          </div>
          <button class="btn btn-primary mt-2" @click="cadastrarProduto">Cadastrar Produto</button>
        </div>

        <!-- Cadastro de Clientes -->
        <div class="mb-4">
          <h2>Cadastro de Clientes</h2>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.nome" placeholder="Nome do Cliente">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.documento" placeholder="Documento">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.telefone" placeholder="Telefone">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.email" placeholder="E-mail">
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="clienteAtivo" v-model="cliente.ativo">
            <label class="form-check-label" for="clienteAtivo">Ativo</label>
          </div>
          <button class="btn btn-primary mt-2" @click="cadastrarCliente">Cadastrar Cliente</button>
        </div>
      </div>

      <!-- Aba de Edição -->
      <div v-if="currentTab === 'edicao'">
        <!-- Conteúdo da aba de edição -->
        <!-- Associação de Produtos -->
        <div class="mb-4">
          <h2>Associação de Produtos</h2>
          <div class="form-group">
            <select class="form-control" v-model="clienteSelecionado">
              <option v-for="(cliente, index) in clientes" :value="cliente" :key="index">{{ cliente.nome }}</option>
            </select>
          </div>
          <div class="form-group">
            <select class="form-control" v-model="produtoSelecionado">
              <option v-for="produto in produtos" :value="produto" :key="produto.id">{{ produto.nome }}</option>
            </select>
          </div>
          <button class="btn btn-primary" @click="associarProduto">Associar Produto</button>
        </div>

        <!-- Listagem de Produtos -->
        <div class="mb-4">
          <h2>Listagem de Produtos</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="produto in produtos" :key="produto.id">
              {{ produto.nome }} - {{ produto.ativo ? 'Ativo' : 'Inativo' }}
              <button class="btn btn-sm btn-primary" @click="editarProduto(produto)">Editar</button>
              <button class="btn btn-sm btn-secondary" @click="ativarInativarProduto(produto)">{{ produto.ativo ? 'Inativar' : 'Ativar' }}</button>
            </li>
          </ul>
        </div>

        <!-- Listagem de Clientes -->
        <div>
          <h2>Listagem de Clientes</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="cliente in clientes" :key="cliente.id">
              {{ cliente.nome }} - {{ cliente.ativo ? 'Ativo' : 'Inativo' }}
              <button class="btn btn-sm btn-primary" @click="editarCliente(cliente)">Editar</button>
              <button class="btn btn-sm btn-secondary" @click="ativarInativarCliente(cliente)">{{ cliente.ativo ? 'Inativar' : 'Ativar' }}</button>
              <button class="btn btn-sm btn-info" @click="associarProduto(cliente)">Associar Produtos</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cliente: {
        nome: '',
        documento: '',
        telefone: '',
        email: '',
        ativo: true
      },
      produto: {
        nome: '',
        ativo: true
      },
      clienteSelecionado: null,
      produtoSelecionado: null,
      clientes: [],
      produtos: [],
      // Adicione uma variável para controlar a aba atual
      currentTab: 'cadastro'
    };
  },
  methods: {
    cadastrarCliente() {
      this.clientes.push({ ...this.cliente });
      this.cliente = {
        nome: '',
        documento: '',
        telefone: '',
        email: '',
        ativo: true
      };
    },
    cadastrarProduto() {
      this.produtos.push({ ...this.produto });
      this.produto = {
        nome: '',
        ativo: true
      };
    },
    associarProduto() {
      if (this.clienteSelecionado && this.produtoSelecionado) {
        // Implemente a lógica de associação aqui
        console.log(`Associando produto ${this.produtoSelecionado.nome} ao cliente ${this.clienteSelecionado.nome}`);
      }
    },
    editarCliente(cliente) {
      // Implemente a lógica de edição aqui
      console.log(`Editando cliente: ${cliente.nome}`);
    },
    editarProduto(produto) {
      // Implemente a lógica de edição aqui
      console.log(`Editando produto: ${produto.nome}`);
    },
    ativarInativarCliente(cliente) {
      cliente.ativo = !cliente.ativo;
    },
    ativarInativarProduto(produto) {
      produto.ativo = !produto.ativo;
    }
  }
};
</script>

<style>
/* CSS CUSTOM */
</style>
