let pacientes = [];

document.getElementById("message").innerHTML = "Dados do Paciente";

const addPaciente = (tipo) => {
    const paciente = document.getElementById("paciente");
    const listaPaciente = document.getElementById("listaPaciente");
    if (paciente.value !== "") {
        pacientes.push({
            nome: paciente.value,
            tipo
        });
        listaPaciente.innerHTML = listarPacientes(pacientes, tipo);
        paciente.value = ''
        paciente.focus()
    } else {
        document.getElementById("message").innerHTML = showMessage(
            "Por favor, informe o nome do paciente",
            "danger"
        );
        setTimeout(() => {
            document.getElementById("message").innerHTML = "Dados do Paciente";
            paciente.focus();
        }, 2500);
    }
};


const urgenciaPaciente = (tipo) => {
    const paciente = document.getElementById("paciente");
    const listaPaciente = document.getElementById("listaPaciente");
    if (paciente.value !== "") {
        pacientes.push({
            nome: paciente.value,
            tipo
        });
        listaPaciente.innerHTML = listarPacientes(pacientes);
        paciente.value = ''
        paciente.focus()
    } else {
        document.getElementById("message").innerHTML = showMessage(
            "Por favor, informe o nome do paciente",
            "danger"
        );
        setTimeout(() => {
            document.getElementById("message").innerHTML = "Dados do Paciente";
            paciente.focus();
        }, 2500);
    }
}

const atenderPaciente = () => {
    const listaPaciente = document.getElementById('listaPaciente')

    if (pacientes.length === 0) {
        listaPaciente.innerHTML = `<p class="text-danger"> Não há pacientes para atendimento </p>`
        document.getElementById("paciente").focus()
        return
    }

    const outAtendimento = document.getElementById('outAtendimento')

    let atender = pacientes.shift()

    outAtendimento.innerHTML = `<p class="text-primary"> ${atender.nome}</p>`

    const lista = listarPacientes(pacientes, 'Atender')
    listaPaciente.innerHTML = lista
}

const showMessage = (message, type) => {
    return `
    <div class="alert alert-${type}" role="alert">
        ${message}
        </div>`;
};

const tipoAtendimento = (tipo) => {
    let cor = {};
    switch (tipo) {
        case "Add":
            cor = {
                message: "Não Urgência",
                cor: "success",
            };
            break;
        case "Urgencia":
            cor = {
                message: "Urgência",
                cor: "warning",
            };
            break;
        case 'Atender':
            cor = {
                message: 'Atendimenteo em andamento',
                cor: 'primary'
            }
        break

    }
    return cor
};

const listarPacientes = (pacientes) => {
    
    let html = '<ul class="list-group">';
    for (let i = 0; i < pacientes.length; i++) {
        const tipoAten = tipoAtendimento(pacientes[i].tipo)
        html += `<li class="list-group-item text-${tipoAten.cor}">${i + 1} - ${pacientes[i].nome
            } - ${tipoAten.message}</li>`;
    }
    html += "</ul>";
    return html;
};

let btnAdicionar = document.getElementById("btnAdicionar");
btnAdicionar.addEventListener("click", () => {
    return addPaciente("Add");
});

let btnAtender = document.getElementById('btnAtender')
btnAtender.addEventListener('click', () => {
    return atenderPaciente()
})

let btnUrgencia = document.getElementById('btnUrgencia')
btnUrgencia.addEventListener("click", () => {
    return urgenciaPaciente('Urgencia')
})