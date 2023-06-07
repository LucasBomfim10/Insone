var cena1 = {
  key: 'cena1',

  preload: function () {
    // Carregando assets específicos para a cena
    this.load.image('map', 'assets/cenario/cenario1.png');
    this.load.image('ground', 'assets/cenario/grounddefault.png');
    this.load.spritesheet('enemy', 'assets/Personagem/inimigocerto.png', {
      frameWidth: 240,
      frameHeight: 223
    });

    this.load.audio('music', 'assets/Pixel Music Pack/mp3/Pixel 3.mp3');
  },

  create: function () {
    // Função de criação da cena
    // Aqui você pode adicionar lógica de inicialização e criação de objetos

    // Função para atualizar as vidas do jogador na tela
    function updatePlayerLives() {
      heartGroup.children.each(function (heart, index) {
        if (index < playerLives) {
          heart.visible = true;
        } else {
          heart.visible = false;
        }
      });
    }

    // Função chamada quando o jogador colide com um inimigo
    function hitEnemy(player, enemy) {
      if (playerCanHitEnemy) {
        playerLives--;
        updatePlayerLives();
        playerCanHitEnemy = false;

        if (playerLives <= 0) {
          this.physics.pause();
          player.setTint(0xff0000);
          this.scene.start('gameover');
        } else {
          player.setX(100);
          player.setY(250);
          this.physics.world.removeCollider(playerCollider);
          this.time.delayedCall(1000, () => {
            playerCanHitEnemy = true;
            playerCollider = this.physics.add.collider(player, enemy, hitEnemy, null, this);
          });
        }
      }
    }

    // Carregando música de fundo
    music = this.sound.add('music');
    music.setVolume(0.3);
    music.setLoop(true);
    music.play();

    // Grupo de corações para exibir as vidas do jogador
    heartGroup = this.add.group();

    // Criação do chão
    this.ground = this.physics.add.staticGroup();
    this.ground.create(2294, 630, 'ground').setScale(1).refreshBody(1);

    // Adicionando uma imagem de mapa
    this.add.image(2294, 300, 'map');

    // Criando jogador e inimigo
    this.player = this.physics.add.sprite(100, this.ground.getChildren()[0].y - 500, 'player', 'player');
    this.enemy = this.physics.add.sprite(700, 304, 'enemy');

    // Configurando offset para o jogador
    this.player.setSize(100, 200); // Define o tamanho da área de colisão
    this.player.setOffset(70, 10); // Define o deslocamento (offset) da área de colisão em relação ao sprite

    // Configurando offset para o inimigo
    this.enemy.setSize(100, 200);
    this.enemy.setOffset(70, 10);

    // Configurando colisões
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy, this.ground);
    playerCollider = this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);
    this.player.setCollideWorldBounds(true);
    this.enemy.setCollideWorldBounds(true);

    // Criação dos corações
    heartGroup.createMultiple({
      key: 'heart',
      repeat: playerLives - 1,
      setXY: { x: 22, y: 22, stepX: 32 },
      setScale: { x: 2, y: 2 }
    });

    // Configurações adicionais dos corações
    heartGroup.children.iterate(function (heart) {
      heart.setScrollFactor(0);
    });

    // Criação das animações do jogador
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 12 }),
      frameRate: 13,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 6 }),
      frameRate: 13,
      repeat: -1
    });

    // Criação das animações do inimigo
    this.anims.create({
      key: 'left1',
      frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 6 }),
      //frames: [{ key: 'enemy', frame: 0 }],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn1',
      frames: [{ key: 'enemy', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right1',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
      //frames: [{ key: 'enemy', frame: 2 }],
      frameRate: 10,
      repeat: -1
    });

    // Configuração da câmera
    this.cameras.main.setBounds(0, 0, 4588, 600);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 0);
    this.cameras.main.setDeadzone(200, 0);

    // Configuração dos limites do mundo físico
    this.physics.world.setBounds(0, 0, 4588, 600);

    // Atribuição da função de atualização das vidas do jogador à cena
    this.updatePlayerLives = updatePlayerLives;
  },

  update: function () {
    // Função de atualização da cena
    // Aqui você pode adicionar lógica de controle do jogo e interações entre os objetos

    var cursors = this.input.keyboard.createCursorKeys();

    // Controle do jogador
    if (cursors.left.isDown) {
      this.player.setVelocityX(-360);
      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(360);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }

    // Movimentação do inimigo em direção ao jogador
    var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy.x, this.enemy.y);
    if (distance < 200) {
      if (this.enemy.x > this.player.x) {
        this.enemy.setVelocityX(-80);
        this.enemy.anims.play('left1', true);
      } else {
        this.enemy.setVelocityX(80);
        this.enemy.anims.play('right1', true);
      }
    } else {
      this.enemy.setVelocityX(0);
      this.enemy.anims.play('turn1', true);
    }

    // Verificação se o jogador chegou ao final da fase
    if (this.player.x >= 4500) {
      music.stop();
      this.scene.stop('cena1');
      game.scene.start('boss1'); // Inicia a cena do chefe
    }
  }
};

