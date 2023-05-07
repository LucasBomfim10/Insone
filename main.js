

var playerLives = 3; // quantidade de vidas inicial do jogador
var heartGroup; // grupo de sprites de coração

function preload() {

    // Carregando a spritesheet do player
    this.load.spritesheet('player', 'assets/Manu (1).png', {
        frameWidth: 157,
        frameHeight: 157
    });
    // Carregando as imagens
    this.load.image('map', 'assets/inicio-jogo-atualizado.png');
    this.load.image('ground', 'assets/grounddefault.png');

    this.load.spritesheet('enemy', 'assets/idle (7).png', {
        frameWidth: 157,
        frameHeight: 157
    });
    // Carregando a imagem do coração
    this.load.image('heart', 'assets/heart.png');


    // Carregando o arquivo de música
    this.load.audio('music', 'assets/Pixel Music Pack/mp3/Pixel 3.mp3');


    }

function create() {
    
    // Adicionando a música ao jogo
    var music = this.sound.add('music');


    // Definindo o volume da música
    music.setVolume(0.3); // Define o volume para 30%

    // Configurando a música para tocar em loop
    music.setLoop(true);

    // Tocando a música
    music.play();



    // Criando o grupo de sprites de coração
    heartGroup = this.add.group();

    // Adicionando o chão
    this.ground = this.physics.add.staticGroup();

    this.ground.create(1768, 570, 'ground').setScale(1).refreshBody(1);

    // Adicionando o céu  
    this.add.image(1768, 300, 'map');


    // Adicionando o player
    this.player = this.physics.add.sprite(100, this.ground.getChildren()[0].y - 500, 'player', 'player');

    // Adicionando o inimigo
    this.enemy = this.physics.add.sprite(700, 304, 'enemy');

    // Configurando colisões
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy, this.ground);
    this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);
    this.player.setCollideWorldBounds(true);
    this.enemy.setCollideWorldBounds(true);



    
    
    // Atualizando a quantidade de vidas
    updatePlayerLives();


    // Configurando câmera

    this.cameras.main.setBounds(0, 0, 3536, 600);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 0);
    this.cameras.main.setDeadzone(200, 0);
    


    // Adicionando bordas invisíveis ao mundo
    this.physics.world.setBounds(0, 0, 3536, 600);

    // Adicionando a colisão entre jogador e inimigo
    this.playerCollider = this.physics.add.collider(this.player, this.enemy);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),

        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        //frames: [{ key: 'player', frame: 2 }],
        frameRate: 10,
        repeat: -1
    });

    //Movientacao inimigo
    this.anims.create({
        key: 'left1',
        //frames: this.anims.generateFrameNumbers('player', { start: 1, end: 0 }),
        frames: [{ key: 'enemy', frame: 0 }],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn1',
        frames: [{ key: 'enemy', frame: 1 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right1',
        //frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
        frames: [{ key: 'enemy', frame: 2 }],
        frameRate: 10,
        repeat: -1
    });

    // Configurando a posição e a escala do grupo de corações
    heartGroup.createMultiple({
        key: 'heart',
        repeat: playerLives - 1,
        setXY: { x: 22, y: 22, stepX: 32 },
        setScale: { x: 2, y: 2 }
    });


    
    // Configurando o scroll factor para cada coração individualmente
    heartGroup.children.iterate(function (heart) {
        heart.setScrollFactor(0);
    });

}


function update() {

    
    // Configurando movimento do player
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        this.player.setVelocityX(-360);
        this.player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        this.player.setVelocityX(360);
        this.player.anims.play('right', true);
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-400);
    }


    // Configurando movimento do inimigo
    var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy.x, this.enemy.y);
    if (distance < 200) {
        if (this.enemy.x > this.player.x) {
            this.enemy.setVelocityX(-80);
            this.enemy.anims.play('left1', true);
        }
        else {
            this.enemy.setVelocityX(80);
            this.enemy.anims.play('rigth1', true);
        }
    }
    else {
        this.enemy.setVelocityX(0);
        this.enemy.anims.play('turn1', true);
    }

    
   


}

function updatePlayerLives() {
    // Atualiza a quantidade de corações de acordo com as vidas do jogador
    heartGroup.children.each(function (heart, index) {
      if (index < playerLives) {
        heart.visible = true;
      } else {
        heart.visible = false;
      }
    });
  }

var playerCanHitEnemy = true; // adiciona um sinalizador de colisão no jogador

function hitEnemy(player, enemy) {
    if (playerCanHitEnemy) {
        // diminui a quantidade de vidas do jogador
        playerLives--;

        // atualiza a quantidade de vidas na tela
        updatePlayerLives();

        // desabilita temporariamente a colisão entre o jogador e o inimigo
        playerCanHitEnemy = false;

        // verifica se o jogador ainda tem vidas
        if (playerLives <= 0) {
            // game over
            this.physics.pause();
            player.setTint(0xff0000);
            game.scene.start('gameover');
            
        } else {
            // reseta a posição do jogador
            player.setX(100);
            player.setY(250);

            // Remove a colisão entre o jogador e o inimigo
            this.physics.world.removeCollider(this.playerCollider);

            // habilita a colisão entre o jogador e o inimigo depois de um tempo
            this.time.delayedCall(1000, () => {
                playerCanHitEnemy = true;
                // adiciona a colisão entre o jogador e o inimigo novamente
                this.playerCollider = this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);
            });
        }
    }
}