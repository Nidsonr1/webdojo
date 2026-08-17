describe('Consultoria', () => {
  beforeEach(() => { 
    cy.accessLogin();
    cy.submitLoginForm('papito@webdojo.com', 'katana123');
    cy.goTo('Formulários', 'Consultoria');
  })

  it('Deve retornar mensagens de campos obrigatórios', () => {
    cy.submitConsultancyForm();

    const messages = [
      'Digite nome e sobrenome',
      'Informe um email válido',
      'Você precisa aceitar os termos de uso'
    ];

    messages.forEach((message) => {
      cy.alertMessagesShouldBeVisible(message);
    });
  });

  it('Deve cadastrar uma consultoria individual', () => {
    cy.get('input[id="name"]').type('Francisa Laisa Unias Ribeiro');
    cy.get('input[id="email"]').type('xiquinha@contato.com');

    cy.get('input[id="phone"]')
      .type('88981463256')
      .should('have.value', '(88) 98146-3256');

    cy.get('select[id="consultancyType"]').select('Individual');

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .click()
      .should('be.checked');
    cy.contains('label', 'Pessoa Jurídica')
      .find("input")
      .should('be.not.checked');

    cy.get('input[id="document"]')
      .type('10407326073')
      .should('have.value', '104.073.260-73');

    const discoveryChannels = [
      'Instagram',
      'LinkedIn',
      'YouTube',
      'Udemy',
      'Indicação de Amigo'
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked');
    });

    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/document.pdf', { force: true });

    cy.get('textarea[id="details"]').type('Mussum Ipsum, cacilds vidis litro abertis.  Copo furadis é disculpa de bebadis, arcu quam euismod magna. Sapien in monti palavris qui num significa nadis i pareci latim. Pellentesque nec nulla ligula. Donec gravida turpis a vulputate ultricies. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.');

    const techs = [
      'Cypress',
      'Robot Framework',
      'Selenium'
    ];

    techs.forEach((tech) => {
      cy.get('input[id="technologies"]')
        .type(tech)
        .type('{enter}');

      cy.contains('label', 'Tecnologias')
        .parent()
        .find('span', tech)
        .should('be.visible');
    });

    cy.contains('label', 'termos de uso')
      .find('input')
      .click();

    cy.submitConsultancyForm();

    cy.contains('h3', 'Sucesso!')
    cy.contains('p', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido');
  })

})