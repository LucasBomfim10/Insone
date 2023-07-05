var cena1 = {
  key: 'cena1',

  preload: function () {
    // Carregando assets específicos para a cena
    this.load.image('map', 'assets/cenario/cenario1.png');
    this.load.image('ground', 'assets/cenario/grounddefault.png');
    this.load.spritesheet('enemy', 'assets/Personagem/inimigo-com-ataque.png', {
      frameWidth: 260,
      frameHeight: 223
    });
    // Carrega os dados salvos do servidor


    this.load.audio('music', 'assets/Pixel Music Pack/mp3/Pixel 3.mp3');
  },



  create: function () {
    // Função de criação da cena
    // Aqui você pode adicionar lógica de inicialização e criação de objetos
    playerLives = 6;
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
          player.setX((this.player.x) - 50);
          //player.setY(250);
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
    this.enemy2 = this.physics.add.sprite(1000, 304, 'enemy');
    this.enemy3 = this.physics.add.sprite(1500, 304, 'enemy');
    this.enemy4 = this.physics.add.sprite(1900, 304, 'enemy');
    this.enemy5 = this.physics.add.sprite(2000, 304, 'enemy');
    this.enemy6 = this.physics.add.sprite(2500, 304, 'enemy');




    // Configurando offset para o jogador
    this.player.setSize(80, 200); // Define o tamanho da área de colisão
    this.player.setOffset(50, 10); // Define o deslocamento (offset) da área de colisão em relação ao sprite

    // Configurando offset para o inimigo
    this.enemy.setSize(100, 200);
    this.enemy.setOffset(70, 10);

    this.enemy2.setSize(100, 200);
    this.enemy2.setOffset(70, 10);

    this.enemy3.setSize(100, 200);
    this.enemy3.setOffset(70, 10);

    this.enemy4.setSize(100, 200);
    this.enemy4.setOffset(70, 10);

    this.enemy5.setSize(100, 200);
    this.enemy5.setOffset(70, 10);

    this.enemy6.setSize(100, 200);
    this.enemy6.setOffset(70, 10);

    // Configurando colisões
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy, this.ground);
    this.physics.add.collider(this.enemy2, this.ground);
    this.physics.add.collider(this.enemy3, this.ground);
    this.physics.add.collider(this.enemy4, this.ground);
    this.physics.add.collider(this.enemy5, this.ground);
    this.physics.add.collider(this.enemy6, this.ground);

    playerCollider = this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy2, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy3, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy4, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy5, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy6, hitEnemy, null, this);

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

    this.anims.create({
      key: 'space-right',
      frames: this.anims.generateFrameNumbers('player', { start: 15, end: 16 }),
      frameRate: 2,
      repeat: 2
    });

    this.anims.create({
      key: 'space-left',
      frames: this.anims.generateFrameNumbers('player', { start: 13, end: 14 }),
      frameRate: 2,
      repeat: 2
    });

    // Criação das animações do inimigo
    this.anims.create({
      key: 'left1',
      frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 7 }),
      //frames: [{ key: 'enemy', frame: 0 }],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'space1-left',
      frames: this.anims.generateFrameNumbers('enemy', { start: 12, end: 15 }),
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

    this.anims.create({
      key: 'space1-right',
      frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 11 }),
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

    var playerX = this.player.x;
    var enemyX = this.enemy.x;
    var enemy2X = this.enemy2.x;
    var enemy3X = this.enemy3.x;
    var enemy4X = this.enemy4.x;
    var enemy5X = this.enemy5.x;
    var enemy6X = this.enemy6.x;

    var cursors = this.input.keyboard.createCursorKeys();




    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      // Dados do jogo que serão enviados para o servidor
      const gameData = {
        saveCena: saveCena,
        // Adicione outras propriedades relevantes do jogo aqui
      };

      // Enviando os dados para o servidor
      fetch('http://localhost:5500/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      })
        .then(response => {
          if (response.ok) {
            console.log('Save successful');
          } else {
            console.log('Save failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    

    // Função de salvar
    function loadSavedData() {
      fetch('http://localhost:5500/load')
        .then(response => response.json())
        .then(data => {
          console.log('Dados salvos:', data);
          // Atualize as vidas do jogador e inimigos com os dados recebidos

          saveCena = data.saveCena






        })
        .catch(error => {
          console.error('Erro ao carregar os dados salvos:', error);
          // Trate o erro de acordo com a sua lógica
        });
    }








    // Controle do jogador
    if (cursors.left.isDown) {
      this.player.setVelocityX(-360);
      this.player.anims.play('left', true);

      if (cursors.space.isDown && cursors.left.isDown) {
        this.player.setVelocityX(-100);
        this.player.anims.play('space-left', true);

        if (playerX <= enemyX + 200 && playerX >= enemyX - 200) {
          enemyLives[0]--;
          if (enemyLives[0] <= 0) {
            console.log(enemyLives[0]);
            this.enemy.disableBody(true, true);

          }
        }
        if (playerX <= enemy2X + 200 && playerX >= enemy2X - 200) {
          enemyLives[1]--;
          if (enemyLives[1] <= 0) {
            this.enemy2.disableBody(true, true);
          }
        }
        if (playerX <= enemy3X + 200 && playerX >= enemy3X - 200) {
          enemyLives[2]--;
          if (enemyLives[2] <= 0) {
            this.enemy3.disableBody(true, true);
          }
        }
        if (playerX <= enemy4X + 200 && playerX >= enemy4X - 200) {
          enemyLives[3]--;
          if (enemyLives[3] <= 0) {
            this.enemy4.disableBody(true, true);
          }
        }
        if (playerX <= enemy5X + 200 && playerX >= enemy5X - 200) {
          enemyLives[4]--;
          if (enemyLives[4] <= 0) {
            this.enemy5.disableBody(true, true);
          }
        }
        if (playerX <= enemy6X + 200 && playerX >= enemy6X - 200) {
          enemyLives[5]--;
          if (enemyLives[5] <= 0) {
            this.enemy6.disableBody(true, true);
          }
        }
      }
    }
    else if (cursors.right.isDown) {
      this.player.setVelocityX(360);
      this.player.anims.play('right', true);

      if ((cursors.space.isDown) && (cursors.right.isDown)) {
        this.player.setVelocityX(100);
        this.player.anims.play('space-right', true);

        if (playerX >= enemyX - 200 && playerX <= enemyX + 200) {
          enemyLives[0]--;
          if (enemyLives[0] <= 0) {
            this.enemy.disableBody(true, true);
          }
        }
        if (playerX >= enemy2X - 200 && playerX <= enemy2X + 200) {
          enemyLives[1]--;
          if (enemyLives[1] <= 0) {
            this.enemy2.disableBody(true, true);
          }
        }
        if (playerX >= enemy3X - 200 && playerX <= enemy3X + 200) {
          enemyLives[2]--;
          if (enemyLives[2] <= 0) {
            this.enemy3.disableBody(true, true);
          }
        }
        if (playerX >= enemy4X - 200 && playerX <= enemy4X + 200) {
          enemyLives[3]--;
          if (enemyLives[3] <= 0) {
            this.enemy4.disableBody(true, true);
          }
        }
        if (playerX >= enemy5X - 200 && playerX <= enemy5X + 200) {
          enemyLives[4]--;
          if (enemyLives[4] <= 0) {
            this.enemy5.disableBody(true, true);
          }
        }
        if (playerX >= enemy6X - 200 && playerX <= enemy6X + 200) {
          enemyLives[5]--;
          if (enemyLives[5] <= 0) {
            this.enemy6.disableBody(true, true);
          }
        }
      }
    }

    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }

    // Movimentação do inimigo em direção ao jogador
    var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy.x, this.enemy.y);
    if (distance <= 400 && distance >= 200) {
      if (this.enemy.x > this.player.x) {
        this.enemy.setVelocityX(-80);
        this.enemy.anims.play('left1', true);
      } else {
        this.enemy.setVelocityX(80);
        this.enemy.anims.play('right1', true);
      }
    }
    else if (distance < 200) {
      if (this.enemy.x > this.player.x) {
        this.enemy.setVelocityX(-80);
        this.enemy.anims.play('space1-left', true);

        if (playerX >= enemyX - 20 && enemyLives[0] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);

        }
      } else {
        this.enemy.setVelocityX(80);
        this.enemy.anims.play('space1-right', true);

        if (playerX <= enemyX + 20 && enemyLives[0] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);

        }
      }
    }
    else {
      this.enemy.setVelocityX(0);
      this.enemy.anims.play('turn1', true);
    }

    // Movimentação do inimigo 2 em direção ao jogador
    var distance2 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy2.x, this.enemy2.y);
    if (distance2 <= 400 && distance2 >= 200) {
      if (this.enemy2.x > this.player.x) {
        this.enemy2.setVelocityX(-80);
        this.enemy2.anims.play('left1', true);
      } else {
        this.enemy2.setVelocityX(80);
        this.enemy2.anims.play('right1', true);
      }
    }
    else if (distance2 < 200) {
      if (this.enemy2.x > this.player.x) {
        this.enemy2.setVelocityX(-80);
        this.enemy2.anims.play('space1-left', true);

        if (playerX >= enemy2X - 20 && enemyLives[1] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);

        }
      } else {
        this.enemy2.setVelocityX(80);
        this.enemy2.anims.play('space1-right', true);

        if (playerX <= enemy2X + 20 && enemyLives[1] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);

        }
      }
    }
    else {
      this.enemy2.setVelocityX(0);
      this.enemy2.anims.play('turn1', true);
    }

    // Movimentação do inimigo 3 em direção ao jogador
    var distance3 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy3.x, this.enemy3.y);
    if (distance3 <= 400 && distance3 >= 200) {
      if (this.enemy3.x > this.player.x) {
        this.enemy3.setVelocityX(-80);
        this.enemy3.anims.play('left1', true);
      } else {
        this.enemy3.setVelocityX(80);
        this.enemy3.anims.play('right1', true);
      }
    }
    else if (distance3 < 200) {
      if (this.enemy3.x > this.player.x) {
        this.enemy3.setVelocityX(-80);
        this.enemy3.anims.play('space1-left', true);

        if (playerX >= enemy3X - 20 && enemyLives[2] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);

        }
      } else {
        this.enemy3.setVelocityX(80);
        this.enemy3.anims.play('space1-right', true);

        if (playerX <= enemy3X + 20 && enemyLives[2] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);

        }
      }
    }
    else {
      this.enemy3.setVelocityX(0);
      this.enemy3.anims.play('turn1', true);
    }

    //movimentação do inimigo 4 em direção ao personagem
    var distance4 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy4.x, this.enemy4.y);
    if (distance4 <= 400 && distance4 >= 200) {
      if (this.enemy4.x > this.player.x) {
        this.enemy4.setVelocityX(-80);
        this.enemy4.anims.play('left1', true);
      } else {
        this.enemy4.setVelocityX(80);
        this.enemy4.anims.play('right1', true);
      }
    }
    else if (distance4 < 200) {
      if (this.enemy4.x > this.player.x) {
        this.enemy4.setVelocityX(-80);
        this.enemy4.anims.play('space1-left', true);

        if (playerX >= enemy4X - 20 && enemyLives[3] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);

        }
      } else {
        this.enemy4.setVelocityX(80);
        this.enemy4.anims.play('space1-right', true);

        if (playerX <= enemy4X + 20 && enemyLives[3] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);

        }
      }
    }
    else {
      this.enemy4.setVelocityX(0);
      this.enemy4.anims.play('turn1', true);
    }

    //movimentação do inimigo 5 em direção ao personagem
    var distance5 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy5.x, this.enemy5.y);
    if (distance5 <= 500 && distance5 >= 200) {
      if (this.enemy5.x > this.player.x) {
        this.enemy5.setVelocityX(-80);
        this.enemy5.anims.play('left1', true);
      } else {
        this.enemy5.setVelocityX(80);
        this.enemy5.anims.play('right1', true);
      }
    }
    else if (distance5 < 200) {
      if (this.enemy5.x > this.player.x) {
        this.enemy5.setVelocityX(-80);
        this.enemy5.anims.play('space1-left', true);

        if (playerX >= enemy5X - 20 && enemyLives[4] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);

        }
      } else {
        this.enemy5.setVelocityX(80);
        this.enemy5.anims.play('space1-right', true);

        if (playerX <= enemy5X + 20 && enemyLives[4] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);

        }
      }
    }
    else {
      this.enemy5.setVelocityX(0);
      this.enemy5.anims.play('turn1', true);
    }

    //movimentação do inimigo 6 em direção ao personagem
    var distance6 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy6.x, this.enemy6.y);
    if (distance6 <= 600 && distance6 >= 200) {
      if (this.enemy6.x > this.player.x) {
        this.enemy6.setVelocityX(-80);
        this.enemy6.anims.play('left1', true);
      } else {
        this.enemy6.setVelocityX(80);
        this.enemy6.anims.play('right1', true);
      }
    }
    else if (distance6 < 200) {
      if (this.enemy6.x > this.player.x) {
        this.enemy6.setVelocityX(-80);
        this.enemy6.anims.play('space1-left', true);

        if (playerX >= enemy6X - 20 && enemyLives[5] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);

        }
      } else {
        this.enemy6.setVelocityX(80);
        this.enemy6.anims.play('space1-right', true);

        if (playerX <= enemy6X + 20 && enemyLives[5] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);

        }
      }
    }
    else {
      this.enemy6.setVelocityX(0);
      this.enemy6.anims.play('turn1', true);
    }
    if (this.player.x >= 2000) {
      music.stop();
      this.scene.stop('cena1');
      game.scene.start('cena2'); // Inicia a cena do chefe
    }


    if (enemyLives[0] <= 0) {
      this.enemy.disableBody(true, true);

    }
    else {
      this.enemy.setActive(true);
      this.enemy.setVisible(true);
    }
    if (enemyLives[1] <= 0) {
      this.enemy2.disableBody(true, true);
    }
    else {
      this.enemy2.setActive(true);
      this.enemy2.setVisible(true);
    }
    if (enemyLives[2] <= 0) {
      this.enemy3.disableBody(true, true);
    }
    else {
      this.enemy3.setActive(true);
      this.enemy3.setVisible(true);
    }
    if (enemyLives[3] <= 0) {
      this.enemy4.disableBody(true, true);
    }
    else {
      this.enemy4.setActive(true);
      this.enemy4.setVisible(true);
    }
    if (enemyLives[4] <= 0) {
      this.enemy5.disableBody(true, true);
    }
    else {
      this.enemy5.setActive(true);
      this.enemy5.setVisible(true);
    }
    if (enemyLives[5] <= 0) {
      this.enemy6.disableBody(true, true);
    }
    else {
      this.enemy6.setActive(true);
      this.enemy6.setVisible(true);
    }
    
    

    //Botao carregar
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L).isDown) {
      saveCena = 1;
      loadSavedData();
      if (saveCena == 1) {
        saveCena = 0;
        music.stop();
        //this.scene.stop('cena1');
        this.scene.restart();

      };

    }




  }


};

