// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


// a linha abaixo é um comentário especial. Está dizendo p cypress buscar como referencia os tipos do cypress. (quando começo a digitar, vai ter autocomplete, consegue ver as assinatura das funções...)
/// <reference types="Cypress" />

//O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.
describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach (function() {
        cy.visit ('./src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should ('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'hi pecial character sequw, home, end, insert, pageUp, pageDownalt, option, ctrl, control, meta, command, cmd, shift If you want to skip parsing special character sequences and type the text exactly as written';
        
        cy.clock();
        
        cy.get('input[id="firstName"]').type('Ana');
        cy.get('input[id="lastName"]').type('Mala');
        cy.get('input[id="email"]').type('e@e.com');
        cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0});
        cy.get('button[type="submit"]').click();
        cy.get('span[class="success"]').should('be.visible'); //outra forma de chamar uma classe é assim: cy.get('.sucess').should('be.visible'); 
        
        cy.tick(3000);
        
        cy.contains('.success', 'Mensagem enviada com sucesso').should('not.be.visible') // verificação de que a mensagem de sucessso não está mais visível
        
    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock();

        cy.get('input[id="firstName"]').type('Ana');
        cy.get('input[id="lastName"]').type('Mala');
        cy.get('input[id="email"]').type('ee.com');
        cy.get('textarea[id="open-text-area"]').type('test');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');

        cy.tick(3000);

        cy.get('.error').should('not.be.visible');
    })
    

    it('validar que, se um valor não-numérico for digitado, seu valor continuará vazio', function() {
        cy.get('#phone')
        .type('Ana')
        .should('have.value', '');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock();

        cy.get('input[id="firstName"]').type('Ana');
        cy.get('input[id="lastName"]').type('Mala');
        cy.get('input[id="email"]').type('e@e.com');
        cy.get('#phone-checkbox').click();
        cy.get('textarea[id="open-text-area"]').type('test');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible'); //cy.get('.phone-label-span required-mark').should

        cy.tick(3000);

        cy.get('.error').should('not.be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id="firstName"]')
          .type('Ana')
          .should('have.value', 'Ana')
          .clear()
          .should('have.value', '');
        cy.get('input[id="lastName"]')
          .type('Mala')
          .should('have.value', 'Mala')
          .clear()
          .should('have.value', '');
        cy.get('input[id="email"]')
          .type('e@e.com')
          .should('have.value', 'e@e.com')
          .clear()
          .should('have.value', '');
        cy.get('#phone')
        .type('1234567')
          .should('have.value', '1234567')
          .clear()
          .should('have.value', '');
        // cy.get('textarea[id="open-text-area"]').type('test');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock();
        
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');

        cy.tick(3000);

        cy.get('.error').should('not.be.visible');
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.clock();  

        cy.fillMandatoryFieldsAndSubmit();
        cy.get('button[type="submit"]').click();
        cy.get('.success').should('be.visible');

        cy.tick(3000);

        cy.get('.success').should('not.be.visible');
    })

    it('primeiro uso do cy-contains', function() {
        cy.clock();  

        cy.fillMandatoryFieldsAndSubmit();
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');
        
        cy.tick(3000);

        cy.get('.success').should('not.be.visible');

    })

    it('teste do comado select: seleciona um produto (YouTube) por seu texto', function() {
        cy.get('select').select('YouTube').should('have.value', 'youtube');
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('select').select('mentoria').should('have.value', 'mentoria');
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('select').select(1).should('have.value', 'blog');
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback');
        //outra forma de fazer: cy get('input[type="radio"][value="feedback"]').check....
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked');
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('[type="checkbox"]').check().should('be.checked');
        cy.get('#phone-checkbox').uncheck().should('not.be.checked');
        //ou: cy.get('[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked');
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture("example.json").as('sampleFile');
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')

      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function() {
      const longText = Cypress._.repeat('012345679', 10)
      cy.get('textarea')
        .invoke('val', longText)
        .should('have.value', longText)
    })
    
    it('faz uma requisição HTTP', function() {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
          const { status, statusText, body } = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    })

    it('desafio(encontre o gato)', function() {
      cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
      cy.get('#title')
        .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
        .invoke('text', 'I love cats')
    })

  })