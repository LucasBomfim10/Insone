var gameover = {
    key: 'gameover',
    preload: function () {
        
        this.load.image('gameover', 'assets/GAMEOVER.png');
    },
    create: function () {
        // Adicionando a imagem de game over
        this.add.image(400, 300, 'gameover').setScale(1);
        
    },
    update: function() {
        gameOver = true;
        this.sound.stopAll();
    }
};