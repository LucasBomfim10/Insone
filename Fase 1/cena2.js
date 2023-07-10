var cena2 = {
  key: "cena2",

  preload: function () {
    // Carregando assets específicos para a cena
    this.load.image("mapp", "assets/cenario/cenario2.png");
    this.load.image("ground", "assets/cenario/grounddefault.png");
    this.load.spritesheet("enemyy", "assets/Personagem/inimigo2.png", {
      frameWidth: 284,
      frameHeight: 292,
    });
    // Carrega os dados salvos do servidor

    this.load.audio("music", "assets/Pixel Music Pack/mp3/Pixel 3.mp3");
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
    function hitenemyy(player, enemyy) {
      if (playerCanHitEnemy) {
        playerLives--;
        updatePlayerLives();
        playerCanHitEnemy = false;

        if (playerLives <= 0) {
          this.physics.pause();
          player.setTint(0xff0000);
          this.scene.start("gameover");
        } else {
          player.setX(this.player.x - 50);
          //player.setY(250);
          this.physics.world.removeCollider(playerCollider);
          this.time.delayedCall(1000, () => {
            playerCanHitEnemy = true;
            playerCollider = this.physics.add.collider(
              player,
              enemyy,
              hitenemyy,
              null,
              this
            );
          });
        }
      }
    }

    // Carregando música de fundo
    music = this.sound.add("music");
    music.setVolume(0.3);
    music.setLoop(true);
    music.play();

    // Grupo de corações para exibir as vidas do jogador
    heartGroup = this.add.group();

    // Criação do chão
    this.ground = this.physics.add.staticGroup();
    this.ground.create(2294, 630, "ground").setScale(1).refreshBody(1);

    // Adicionando uma imagem de mapp
    this.add.image(2294, 300, "mapp");

    // Criando jogador e inimigo
    this.player = this.physics.add.sprite(
      100,
      this.ground.getChildren()[0].y - 500,
      "player",
      "player"
    );
    this.enemyy = this.physics.add.sprite(700, 304, "enemyy");
    this.enemyy2 = this.physics.add.sprite(1000, 304, "enemyy");
    this.enemyy4 = this.physics.add.sprite(1900, 304, "enemyy");
    this.enemyy6 = this.physics.add.sprite(3600, 304, "enemyy");

    // Configurando offset para o jogador
    this.player.setSize(80, 200); // Define o tamanho da área de colisão
    this.player.setOffset(50, 10); // Define o deslocamento (offset) da área de colisão em relação ao sprite

    // Configurando offset para o inimigo
    this.enemyy.setSize(100, 200);
    this.enemyy.setOffset(70, 10);

    this.enemyy2.setSize(100, 200);
    this.enemyy2.setOffset(70, 10);

    this.enemyy4.setSize(100, 200);
    this.enemyy4.setOffset(70, 10);

    this.enemyy6.setSize(100, 200);
    this.enemyy6.setOffset(70, 10);

    // Configurando colisões
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemyy, this.ground);
    this.physics.add.collider(this.enemyy2, this.ground);
    this.physics.add.collider(this.enemyy4, this.ground);
    this.physics.add.collider(this.enemyy6, this.ground);

    playerCollider = this.physics.add.collider(
      this.player,
      this.enemyy,
      hitenemyy,
      null,
      this
    );
    this.physics.add.collider(this.player, this.enemyy2, hitenemyy, null, this);
    this.physics.add.collider(this.player, this.enemyy4, hitenemyy, null, this);
    this.physics.add.collider(this.player, this.enemyy6, hitenemyy, null, this);

    this.player.setCollideWorldBounds(true);
    this.enemyy.setCollideWorldBounds(true);

    // Criação dos corações
    heartGroup.createMultiple({
      key: "heart",
      repeat: playerLives - 1,
      setXY: { x: 22, y: 22, stepX: 32 },
      setScale: { x: 2, y: 2 },
    });

    // Configurações adicionais dos corações
    heartGroup.children.iterate(function (heart) {
      heart.setScrollFactor(0);
    });

    // Criação das animações do jogador
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 12 }),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 6 }),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "space-right",
      frames: this.anims.generateFrameNumbers("player", { start: 15, end: 16 }),
      frameRate: 2,
      repeat: 2,
    });

    this.anims.create({
      key: "space-left",
      frames: this.anims.generateFrameNumbers("player", { start: 13, end: 14 }),
      frameRate: 2,
      repeat: 2,
    });

    // Criação das animações do inimigo
    this.anims.create({
      key: "left11",
      frames: this.anims.generateFrameNumbers("enemyy", { start: 6, end: 11 }),
      //frames: [{ key: 'enemyy', frame: 0 }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn11",
      frames: [{ key: "enemyy", frame: 6 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right11",
      frames: this.anims.generateFrameNumbers("enemyy", { start: 0, end: 5 }),
      //frames: [{ key: 'enemyy', frame: 2 }],
      frameRate: 10,
      repeat: -1,
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
    var enemyyX = this.enemyy.x;
    var enemyy2X = this.enemyy2.x;
    var enemyy4X = this.enemyy4.x;
    var enemyy6X = this.enemyy6.x;

    var cursors = this.input.keyboard.createCursorKeys();

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      // Dados do jogo que serão enviados para o servidor
      const gameData = {
        saveCena: saveCena,
        // Adicione outras propriedades relevantes do jogo aqui
      };

      // Enviando os dados para o servidor
      fetch("http://localhost:5500/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Save successful");
          } else {
            console.log("Save failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // Função de salvar
    function loadSavedData() {
      fetch("http://localhost:5500/load")
        .then((response) => response.json())
        .then((data) => {
          console.log("Dados salvos:", data);
          // Atualize as vidas do jogador e inimigos com os dados recebidos

          saveCena = data.saveCena;
        })
        .catch((error) => {
          console.error("Erro ao carregar os dados salvos:", error);
          // Trate o erro de acordo com a sua lógica
        });
    }

    // Controle do jogador
    if (cursors.left.isDown) {
      this.player.setVelocityX(-360);
      this.player.anims.play("left", true);

      if (cursors.space.isDown && cursors.left.isDown) {
        this.player.setVelocityX(-100);
        this.player.anims.play("space-left", true);

        if (playerX <= enemyyX + 200 && playerX >= enemyyX - 200) {
          enemyyLives[0]--;
          if (enemyyLives[0] <= 0) {
            console.log(enemyyLives[0]);
            this.enemyy.disableBody(true, true);
          }
        }
        if (playerX <= enemyy2X + 200 && playerX >= enemyy2X - 200) {
          enemyyLives[1]--;
          if (enemyyLives[1] <= 0) {
            this.enemyy2.disableBody(true, true);
          }
        }

        if (playerX <= enemyy4X + 200 && playerX >= enemyy4X - 200) {
          enemyyLives[2]--;
          if (enemyyLives[2] <= 0) {
            this.enemyy4.disableBody(true, true);
          }
        }

        if (playerX <= enemyy6X + 200 && playerX >= enemyy6X - 200) {
          enemyyLives[3]--;
          if (enemyyLives[3] <= 0) {
            this.enemyy6.disableBody(true, true);
          }
        }
      }
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(360);
      this.player.anims.play("right", true);

      if (cursors.space.isDown && cursors.right.isDown) {
        this.player.setVelocityX(100);
        this.player.anims.play("space-right", true);

        if (playerX >= enemyyX - 200 && playerX <= enemyyX + 200) {
          enemyyLives[0]--;
          if (enemyyLives[0] <= 0) {
            this.enemyy.disableBody(true, true);
          }
        }
        if (playerX >= enemyy2X - 200 && playerX <= enemyy2X + 200) {
          enemyyLives[1]--;
          if (enemyyLives[1] <= 0) {
            this.enemyy2.disableBody(true, true);
          }
        }

        if (playerX >= enemyy4X - 200 && playerX <= enemyy4X + 200) {
          enemyyLives[2]--;
          if (enemyyLives[2] <= 0) {
            this.enemyy4.disableBody(true, true);
          }
        }

        if (playerX >= enemyy6X - 200 && playerX <= enemyy6X + 200) {
          enemyyLives[3]--;
          if (enemyyLives[3] <= 0) {
            this.enemyy6.disableBody(true, true);
          }
        }
      }
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }

    // Movimentação do inimigo em direção ao jogador
    var distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.enemyy.x,
      this.enemyy.y
    );
    if (distance <= 400 && distance >= 200) {
      if (this.enemyy.x > this.player.x) {
        this.enemyy.setVelocityX(-80);
        this.enemyy.anims.play("left11", true);
      } else {
        this.enemyy.setVelocityX(80);
        this.enemyy.anims.play("right11", true);
      }
    } else if (distance < 200) {
      if (this.enemyy.x > this.player.x) {
        this.enemyy.setVelocityX(-80);
        this.enemyy.anims.play("left11", true);

        if (playerX >= enemyyX - 20 && enemyyLives[0] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);
        }
      } else {
        this.enemyy.setVelocityX(80);
        this.enemyy.anims.play("right11", true);

        if (playerX <= enemyyX + 20 && enemyyLives[0] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);
        }
      }
    } else {
      this.enemyy.setVelocityX(0);
      this.enemyy.anims.play("turn11", true);
    }

    // Movimentação do inimigo 2 em direção ao jogador
    var distance2 = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.enemyy2.x,
      this.enemyy2.y
    );
    if (distance2 <= 400 && distance2 >= 200) {
      if (this.enemyy2.x > this.player.x) {
        this.enemyy2.setVelocityX(-80);
        this.enemyy2.anims.play("left11", true);
      } else {
        this.enemyy2.setVelocityX(80);
        this.enemyy2.anims.play("right11", true);
      }
    } else if (distance2 < 200) {
      if (this.enemyy2.x > this.player.x) {
        this.enemyy2.setVelocityX(-80);
        this.enemyy2.anims.play("space11-left", true);

        if (playerX >= enemyy2X - 20 && enemyyLives[1] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);
        }
      } else {
        this.enemyy2.setVelocityX(80);
        this.enemyy2.anims.play("space11-right", true);

        if (playerX <= enemyy2X + 20 && enemyyLives[1] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);
        }
      }
    } else {
      this.enemyy2.setVelocityX(0);
      this.enemyy2.anims.play("turn11", true);
    }

    //movimentação do inimigo 4 em direção ao personagem
    var distance4 = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.enemyy4.x,
      this.enemyy4.y
    );
    if (distance4 <= 400 && distance4 >= 200) {
      if (this.enemyy4.x > this.player.x) {
        this.enemyy4.setVelocityX(-80);
        this.enemyy4.anims.play("left11", true);
      } else {
        this.enemyy4.setVelocityX(80);
        this.enemyy4.anims.play("right11", true);
      }
    } else if (distance4 < 200) {
      if (this.enemyy4.x > this.player.x) {
        this.enemyy4.setVelocityX(-80);
        this.enemyy4.anims.play("space11-left", true);

        if (playerX >= enemyy4X - 20 && enemyyLives[3] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);
        }
      } else {
        this.enemyy4.setVelocityX(80);
        this.enemyy4.anims.play("space11-right", true);

        if (playerX <= enemyy4X + 20 && enemyyLives[3] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);
        }
      }
    } else {
      this.enemyy4.setVelocityX(0);
      this.enemyy4.anims.play("turn11", true);
    }

    //movimentação do inimigo 6 em direção ao personagem
    var distance6 = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.enemyy6.x,
      this.enemyy6.y
    );
    if (distance6 <= 600 && distance6 >= 200) {
      if (this.enemyy6.x > this.player.x) {
        this.enemyy6.setVelocityX(-80);
        this.enemyy6.anims.play("left11", true);
      } else {
        this.enemyy6.setVelocityX(80);
        this.enemyy6.anims.play("right11", true);
      }
    } else if (distance6 < 200) {
      if (this.enemyy6.x > this.player.x) {
        this.enemyy6.setVelocityX(-80);
        this.enemyy6.anims.play("space11-left", true);

        if (playerX >= enemyy6X - 20 && enemyyLives[5] > 0) {
          var temp = this.player.x;
          this.player.setX(temp - 190);
        }
      } else {
        this.enemyy6.setVelocityX(80);
        this.enemyy6.anims.play("space11-right", true);

        if (playerX <= enemyy6X + 20 && enemyyLives[5] > 0) {
          var temp = this.player.x;
          this.player.setX(temp + 190);
        }
      }
    } else {
      this.enemyy6.setVelocityX(0);
      this.enemyy6.anims.play("turn11", true);
    }
    if (this.player.x >= 4200) {
      music.stop();
      this.scene.stop("cena2");
      game.scene.start("boss1"); // Inicia a cena 2
    }

    if (enemyyLives[0] <= 0) {
      this.enemyy.disableBody(true, true);
    } else {
      this.enemyy.setActive(true);
      this.enemyy.setVisible(true);
    }
    if (enemyyLives[1] <= 0) {
      this.enemyy2.disableBody(true, true);
    } else {
      this.enemyy2.setActive(true);
      this.enemyy2.setVisible(true);
    }
    if (enemyyLives[2] <= 0) {
      this.enemyy4.disableBody(true, true);
    } else {
      this.enemyy4.setActive(true);
      this.enemyy4.setVisible(true);
    }
    if (enemyyLives[3] <= 0) {
      this.enemyy6.disableBody(true, true);
    } else {
      this.enemyy6.setActive(true);
      this.enemyy6.setVisible(true);
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
      }
    }
  },
};
