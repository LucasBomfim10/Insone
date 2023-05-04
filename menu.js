var menuConfig = {
    key: 'menu',
    preload: function () {
        this.load.image('background', 'assets/cenario-2.png');
        this.load.image('button', 'assets/button.png');
    },
    create: function () {
        // Adicione um fundo ao menu
        this.add.image(400, 300, 'background');

        // Adicione um botão ao menu
        var button = this.add.image(390, 200, 'button');

        // Adicione uma função de clique ao botão
        button.setInteractive();
        button.on('pointerdown', function () {
            // Comece o jogo
            this.scene.start('intro');
        }, this);
    }
};