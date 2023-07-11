var introConfig = {
  key: "intro",
  preload: function () {},
  create: function () {
    var self = this; // Armazena uma referência ao contexto atual

    // Configurações do texto
    var textConfig = {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
      align: "center",
      wordWrap: { width: 600, useAdvancedWrap: true },
      stroke: "#000000",
      strokeThickness: 4,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 2,
        stroke: true,
        fill: true,
      },
    };

    // Função para limpar a tela
    function clearScreen() {
      self.children.removeAll();
    }

    // Adicionando o texto da introdução - Imagem "Intro1"
    var introText1 =
      "Está a noite e uma garota se afasta da vila com um balde e um tridente em sua mão. Ela senta próxima ao rio e deita na grama. Vemos a noite virar dia e a garota ainda está acordada contemplando o céu vazio.";

    clearScreen();

    self.add
      .text(
        game.config.width / 2,
        game.config.height / 2,
        introText1,
        textConfig
      )
      .setOrigin(0.5);

    setTimeout(() => {
      clearScreen();

      // Adicionando o texto da introdução - Imagem "Intro2"
      var introText2 =
        "De dia, ela escuta um som gemido macabro vindo da vila. Ao se aproximar do seu vilarejo, ela vê que não há mais ninguém presente. Procurando um pouco mais, ela vê todos os moradores mortos empilhados atrás de uma casa. A garota não sabe como reagir, mas vê que há um caminho que não existia antes ali. Esse caminho a leva a uma árvore que, por algum motivo, a atrai. Ao se aproximar, surgem vários corpos enforcados nos galhos da árvore e vários demônios aparecem ao seu redor. A personagem entra em pânico com os seres se aproximando, mas ela é levitada por alguma coisa e é marcada com estigmas em suas duas mãos.";

      self.add
        .text(
          game.config.width / 2,
          game.config.height / 2,
          introText2,
          textConfig
        )
        .setOrigin(0.5);

      setTimeout(() => {
        clearScreen();

        // Adicionando o texto da introdução - Imagem "Intro3"
        var introText3 =
          "Parece que há um som que faz os demônios andarem em uma certa direção, e a personagem vê sua oportunidade de correr. Após várias horas correndo, ela se depara com a floresta que antes visitara, mas agora com um ar esbranquiçado e sem vida.";

        self.add
          .text(
            game.config.width / 2,
            game.config.height / 2,
            introText3,
            textConfig
          )
          .setOrigin(0.5);

        setTimeout(() => {
          self.scene.stop("intro");
          game.scene.start("cena1"); // carregar a cena principal após o tempo desejado
        }, 8000); // tempo de exibição da tela preta e do texto em milissegundos
      }, 15000); // tempo de exibição da Imagem "Intro2"
    }, 5000); // tempo de exibição da Imagem "Intro1"
  },
};
