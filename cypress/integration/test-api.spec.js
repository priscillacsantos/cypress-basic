it ('faz uma requisição HTTP', function () {
    cy.request({
        method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    }).then((Response) => {
        expect(Response.status).to.equal(200);
        expect(Response.statusText).to.equal('OK');
        expect(Response.body).contain('CAC TAT');
    })
})