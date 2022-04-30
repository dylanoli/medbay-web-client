<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" style="margin-top: 5px; display: flex">
        <v-text-field
          id="cep"
          label="CEP"
          outlined
          type="text"
          dense
          style="padding-right: 10px"
          v-mask="'#####-###'"
          v-model="endereco.cep"
          :readonly="readonly"
        ></v-text-field>
        <v-btn
          v-if="!readonly"
          id="btn-busca-cep"
          height="40"
          outlined
          @click="buscaCep()"
          :loading="loadCep"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="9" class="pr-5">
        <v-text-field
          :readonly="readonly"
          id="rua"
          label="Rua"
          outlined
          type="text"
          dense
          v-model="endereco.rua"
        ></v-text-field>
      </v-col>
      <v-col md="3" cols="3">
        <v-text-field
          :readonly="readonly"
          label="Numero"
          outlined
          type="text"
          dense
          v-model="endereco.numero"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          :readonly="readonly"
          label="Bairro"
          outlined
          type="text"
          dense
          v-model="endereco.bairro"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="9" cols="12" style="padding-right: 12px">
        <v-text-field
          :readonly="readonly"
          label="Cidade"
          outlined
          type="text"
          dense
          v-model="endereco.cidade"
        ></v-text-field>
      </v-col>
      <v-col md="3" cols="12" style="padding-left: 12px">
        <v-combobox
          :readonly="readonly"
          v-model="endereco.uf"
          @change="formatUf()"
          :items="estados"
          label="UF"
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { api } from "@/services";
export default {
  props: {
    target: {
      required: true,
    },
    readonly: {
      required: false,
    },
  },
  mounted() {
    this.endereco = this.target;
  },
  watch: {
    endereco() {
      if (this.endereco != undefined)
        this.$emit("update:target", this.endereco);
    },
    target(newValue) {
      this.endereco = newValue;
    },
  },
  methods: {
    formatUf() {
      const vm = this;
      vm.endereco.uf = vm.endereco.uf.toLocaleUpperCase();
    },
    async buscaCep() {
      this.loadCep = true;
      try {
        const cep = this.endereco.cep.replace("-", "");
        const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
        this.loadCep = false;
        if (response.data.erro == undefined) {
          this.endereco = {
            ...this.endereco,
            cep: response.data.cep,
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            uf: response.data.uf,
            cidade: response.data.localidade,
          };
        } else {
          this.loadCep = false;
          this.$store.commit("setError", "CEP não encontrado");
        }
      } catch (error) {
        this.loadCep = false;
        this.$store.commit("setError", "CEP não encontrado");
      }
    },
  },
  data: () => ({
    loadCep: false,
    endereco: {
      cep: "",
    },
    estados: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
  }),
};
</script>