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
          <h2><i class="fas fa-shopping-cart"></i>Cadastro de Produtos</h2>
          <div class="form-group">
            <input type="text" class="form-control" v-model="produto.nome" placeholder="Nome do Produto" autofocus>
          </div>
          <button class="btn btn-primary mt-2" @click="cadastrarProduto">Cadastrar Produto</button>
        </div>

        <!-- Cadastro de Clientes -->
        <div class="mb-4">
          <h2><i class="fas fa-user"></i>Cadastro de Clientes</h2>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.nome" placeholder="Nome do Cliente">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.documento" placeholder="CPF" >
          </div>
          <div class="form-group">
            <input type="text" 
            class="form-control" 
            v-mask="phoneMask" 
            :class="{'is-invalid': !isPhoneValid && phoneNumberTouched}" 
            @blur="phoneNumberTouched = true"
            placeholder="Telefone" 
            v-model="cliente.telefone
            ">
            <div v-if="!isPhoneValid && phoneNumberTouched" class="invalid-feedback">
            Por favor, insira um número de telefone válido.
          </div>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="cliente.email" placeholder="E-mail">
          </div>
          <button class="btn btn-primary mt-2" @click="cadastrarCliente">Cadastrar Cliente</button>
        </div>
      </div>

      <!-- Aba de Edição -->
      <div v-if="currentTab === 'edicao'">
        <!-- Conteúdo da aba de edição -->
        <!-- Associação de Produtos -->
        <div class="mb-4">
          <h2><i class="fas fa-exchange-alt"></i>Associação de Produtos</h2>
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
          <h2><i class="fas fa-list"></i>Listagem de Produtos</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="produto in produtos" :key="produto.id">
              {{ produto.nome }} - {{ produto.ativo ? 'Ativo' : 'Inativo' }}
              <!-- Mudança do botão para Excluir -->
              <button class="btn btn-sm btn-danger" @click="removerProduto(produto)">Excluir</button>
              <button class="btn btn-sm btn-secondary" @click="ativarInativarProduto(produto)">{{ produto.ativo ? 'Inativar' : 'Ativar' }}</button>
            </li>
          </ul>
        </div>

        <!-- Listagem de Clientes -->
        <div>
          <h2><i class="fas fa-user"></i>Listagem de Clientes</h2>
          <ul class="list-group">
            <li class="list-group-item" v-for="cliente in clientes" :key="cliente.id">
              {{ cliente.nome }} - {{ cliente.ativo ? 'Ativo' : 'Inativo' }}
              <button class="btn btn-sm btn-danger" @click="removerCliente(cliente)">Excluir</button>
              <button class="btn btn-sm btn-secondary" @click="ativarInativarCliente(cliente)">{{ cliente.ativo ? 'Inativar' : 'Ativar' }}</button>
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
        phoneNumberTouched: false, // Estado para verificar se o input foi tocado
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
  computed:{
    //mask phone
    phoneMask() {
      const digits = this.cliente.telefone.replace(/\D+/g, '');
      return digits.length <= 10 ? '(##) ####-####' : '(##) #####-####';
    },
    isPhoneValid() {
      const digits = this.cliente.telefone.replace(/\D+/g, '');
      // Verifica se o número atende ao comprimento mínimo para telefones fixos e móveis
      return digits.length === 10 || digits.length === 11;
    }
  },
  methods: {
    cadastrarCliente() {
      
    // verificação de toque no campo do telefone
    this.phoneNumberTouched = true;

    // Validando campos, incluindo a validação do número de telefone
    if (!this.cliente.nome || !this.cliente.documento || !this.cliente.telefone || !this.cliente.email || !this.isPhoneValid) {
      window.alert('Por favor, preencha todos os campos do formulário corretamente.');
      return;
    }

    // Simulando validação de e-mail
    if (!this.validarEmail(this.cliente.email)) {
      window.alert('Por favor, insira um e-mail válido.');
      return;
    }

    // Aqui você pode incluir a lógica para efetivamente cadastrar o cliente...
    this.clientes.push({ ...this.cliente });
    this.cliente = {
      nome: '',
      documento: '',
      telefone: '',
      email: '',
      ativo: true
    };

    // Alerta de sucesso
    window.alert('Cliente cadastrado com sucesso!');
    },
    cadastrarProduto() {
      // Validando campos
      if (!this.produto.nome) {
        window.alert('Por favor, preencha o nome do produto.');
        return;
      }

      this.produtos.push({ ...this.produto });
      this.produto = {
        nome: '',
        ativo: true
      };

      // Alerta de sucesso
      window.alert('Produto cadastrado com sucesso!');
    },
    removerProduto(produto) {
      const index = this.produtos.indexOf(produto);
      if (index !== -1) {
        this.produtos.splice(index, 1);
        window.alert('Produto removido com sucesso!');
      }
    },
        removerCliente(cliente) {
      const index = this.clientes.indexOf(cliente);
      if (index !== -1) {
        this.clientes.splice(index, 1);
        window.alert('Cliente removido com sucesso!');
      }
    },
    associarProduto() {
      if (this.clienteSelecionado && this.produtoSelecionado) {
        // Implementar a logica para endpoint
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
    },
    validarEmail(email) {
      // Regex simples para validar o formato do e-mail
      const regex = /\S+@\S+\.\S+/;
      return regex.test(email);
    }
  }
};
</script>

<style lang="scss" scoped>

body{
  #myTabContent .form-group{
    margin: 10px 0;
  }

  #myTab{
    margin-bottom: 20px;
    li{
      cursor: pointer;
    }
  }
  .list-group button{
    margin-right: 3px;
  }
  h2{
    margin-bottom: 12px;
    i{
      font-size: 20px;
      margin-right: 8px;
    }
  }
}

</style>
