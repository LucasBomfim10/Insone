var menuConfig = {
    key: 'menu',
    preload: function () {
        this.load.image('background', 'assets/Menu/INSONE.png');
        this.load.image('button', 'assets/Menu/button.png');
    },
    create: function () {
        
        // Adicione um botão ao menu
        var button = this.add.image(524, 302, null);
        // Adicione um fundo ao menu
        this.add.image(400, 300, 'background');

        // Adicione uma função de clique ao botão
        button.setInteractive();
        button.on('pointerdown', function () {
            // Comece o jogo
            this.scene.start('intro');
        }, this);
    }
};