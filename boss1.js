var boss1 = {
    key: 'boss1',
    preload: function () {
        this.load.image('boss1fundo', 'assets/boss1-fundo.png');
        this.load.audio('music1', 'assets/Pixel Music Pack/mp3/Pixel 5.mp3');
        

    },
    create: function () {
        this.add.image(400, 300, 'boss1fundo');
        
        

        // Adicionando a música ao jogo
        var music1 = this.sound.add('music1');

        // Definindo o volume da música
        music1.setVolume(0.3); // Define o volume para 30%

        // Configurando a música para tocar em loop
        music1.setLoop(true);

        // Tocando a música
        music1.play();

        
    }
};