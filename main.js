// Phaser configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#cc0000",
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("image1", "assets/image1.png");
  this.load.image("image2", "assets/image2.png");
}

function create() {
  const image1 = this.add.image(50, 300, "image1").setScale(0.5); // Resize image1
  
  // Add pointer events for interactivity
  image1.setInteractive();
  image1.on("pointerover", () => {
    image1.setScale(0.6); // Scale up on hover
    image1.setTint(0xffcc00); // Add a tint effect
  });

  image1.on("pointerout", () => {
    image1.setScale(0.5); // Reset scale on pointer out
    image1.clearTint(); // Remove tint effect
  });

  // Add tweens with interactivity and animation chaining
  this.tweens.add({
    targets: image1,
    x: 700,
    y: 300,
    angle: 360,
    duration: 2000,
    ease: "Power1",
    onComplete: () => {
      this.tweens.add({
        targets: image1,
        x: 50,
        y: 300,
        angle: 360,
        duration: 2000,
        ease: "Power1",
        onComplete: () => {
          this.tweens.add({
            targets: image1,
            x: 700,
            y: 300,
            angle: 360,
            duration: 3000,
            ease: "Power1",
            onComplete: () => {
              image1.destroy();

              const image2 = this.add.image(700, 300, "image2").setScale(0.5); // Display image2 after animation
              image2.setInteractive();

              // Add interactivity to the new image
              image2.on("pointerover", () => {
                image2.setScale(0.6);
                image2.setTint(0xff6600);
              });

              image2.on("pointerout", () => {
                image2.setScale(0.5);
                image2.clearTint();
              });
            },
          });
        },
      });
    },
  });
}
