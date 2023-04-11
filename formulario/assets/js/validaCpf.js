class ValidaCpf {
    constructor(cpf) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            value: cpf.replace(/\D+/g, ''),
        });
    }

    criaDigito(cpfSemDigitos) {
        let cont = cpfSemDigitos.length + 1;
        let total = 0
        for(let n of cpfSemDigitos) {
            total += cont * Number(n);
            cont --;
        }
        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0';
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = this.criaDigito(cpfSemDigitos);
        const digito2 = this.criaDigito(cpfSemDigitos + digito1);
        this.novoCpf = cpfSemDigitos + digito1 + digito2;
    }

    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.eSequencia()) return false;
        this.geraNovoCpf();

        return this.novoCpf === this.cpfLimpo;
    }
}

