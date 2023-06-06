var introConfig = {
    key: 'intro',
    preload: function () {
        // Carregando as imagens de introdução
        this.load.image('intro1', 'assets/Intro1.png');
        this.load.image('intro2', 'assets/Intro2.png');
        this.load.image('intro3', 'assets/Intro3.png');
    },
    create: function () {
        // Adicionando as imagens de introdução
        this.add.image(400, 300, 'intro1').setScale(1);
        setTimeout(() => {
            this.add.image(400, 300, 'intro2').setScale(1);
        }, 500); // exibir a segunda imagem após 5 segundos
        setTimeout(() => {
            this.add.image(400, 300, 'intro3').setScale(1);
        }, 1000); // exibir a terceira imagem após 10 segundos
        setTimeout(() => {
            this.scene.start('main'); // carregar a cena principal após 15 segundos
        }, 1500);
    }
};
