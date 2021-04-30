const HEALTH_PACK_RANDOM_SPAWN_RATE = 10000;
const SAFE_SPAWN_DISTANCE = 300;
const SPAWN_BORDER = 48;

class Game {
    #gameTimer = 0;
    #healthPackTimer = HEALTH_PACK_RANDOM_SPAWN_RATE;
    stageNumber = 0;
    #initializedStage = false;
    #start_alpha = 130;
    
    initialize() {
        this.#gameTimer = 0;
        this.stageNumber = 8;
        this.stageNumber = 0;
        this.#initializedStage = false;
        this.restartHealthTimer();
    }

    restartHealthTimer() {
        this.#healthPackTimer = random(7000) + HEALTH_PACK_RANDOM_SPAWN_RATE;
    }

    update(dt) {
        this.#gameTimer += dt;
        this.#healthPackTimer -= dt;
        
        if (this.#healthPackTimer <= 0) {
            this.restartHealthTimer();
            let p = new Healthpack(random(SPAWN_BORDER, GAME_WIDTH - SPAWN_BORDER), 
            random(SPAWN_BORDER, GAME_HEIGHT - SPAWN_BORDER), 16, 30000, 2);
            healthPacks.push(p);
        }

        switch (this.stageNumber) {
            case 0:
                this.updateStage0(dt);
                break;
            case 1:
                this.updateStage1(dt);
                break;
            case 2:
                this.updateStage2(dt);
                break;
            case 3:
                this.updateStage3(dt);
                break;
            case 4:
                this.updateStage4(dt);
                break;
            case 5:
                this.updateStage5(dt);
                break;
            case 6:
                this.updateStage6(dt);
                break;
            case 7:
                this.updateStage7(dt);
                break;
            case 8:
                this.updateStage8(dt);
                break;
        }
    }

    setStage(newStage) {
        this.stageNumber = newStage;
        this.#initializedStage = false;
        this.#gameTimer = 0;
        console.log(`Changing to stage ${newStage}`);
    }

    //#region STAGES
    #stageVariable = 0;
    #dropperTTL = 35000;

    // Stage 0 - Introduction
    // Simply displays a "Get Ready" message for the player before they get into it
    updateStage0(dt) {
        let startTime = 1000;
        if (this.#gameTimer > startTime) {
            textAlign(CENTER, CENTER);
            fill(0, 255, 0, this.#start_alpha);
            if (this.#gameTimer < startTime + 200) {
                let h = Math.min(1, (this.#gameTimer - startTime) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else if (this.#gameTimer < startTime + 4100) {
                rect(BORDER, (GAME_HEIGHT / 2 - 200 / 2) , GAME_WIDTH - BORDER * 2, 200);
            }
            else if (this.#gameTimer < startTime + 4200) {
                let h = Math.max(0, (startTime + 4200 - this.#gameTimer) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else {
                this.setStage(1);
            }

            if (this.#gameTimer > startTime + 3100) {
                textSize(48);
                this.#stageVariable = Math.max(0, this.#stageVariable - deltaTime / 1000 * 200);
                fill(255, 255, 255, int(Math.min(this.#start_alpha, this.#stageVariable)));
                text("Get Ready!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            }
            else if (this.#gameTimer > startTime + 100) {
                textSize(48);
                this.#stageVariable = Math.min(this.#start_alpha, this.#stageVariable + deltaTime / 1000 * 200);
                fill(255, 255, 255, int(Math.min(this.#start_alpha, this.#stageVariable)));
                text("Get Ready!", GAME_WIDTH / 2, GAME_HEIGHT / 2)
            }
        }
    }

    // Stage 1 - Free Time
    // The player will have (1.5) seconds of free time when after they are greeted from the introduction
    updateStage1(dt) {
        if (this.#gameTimer > 1500) {
            this.#gameTimer = 0;
            console.log(1);
            this.setStage(2);
        }
    }

    // Stage 2 - First Droppers
    // Summons 6 droppers around the perimeter of the screen
    updateStage2(dt) {
        if (!this.#initializedStage) {
            this.#initializedStage = true;
            this.spawnScreenDroppers(this.#dropperTTL);
        }

        if (this.#gameTimer > 8500) {
            this.setStage(3);
        }
    }

    // Stage 3 - First Vortexes
    // Summons (5) random vortexes around the screen
    updateStage3(dt) {
        if (!this.#initializedStage) {
            for (let i = 0; i < 4; i++) {
                let v = new VortexLauncher((windowWidth - 2 * SPAWN_BORDER) * Math.random() + SPAWN_BORDER,
                    (windowHeight - 2 * SPAWN_BORDER) * Math.random() + SPAWN_BORDER,
                    0, 10000, int(Math.random() * 3 + 3), Math.random() * 3 + 2);

                vortexs.push(v);
            }
            this.#initializedStage = true;
        }
        if (this.#gameTimer > 8000) {
            this.setStage(4);
        }
    }

    // Stage 4 - 7 Vortexes + 4 Even Droppers + 3 Drunk Dropper
    // Summons 9 vortexes, 4 droppers around the screen, and 1 drunk dropper (a dropper that fires bullets
    // in all directions, not really a vortex)
    updateStage4(dt) {
        if (!this.#initializedStage && this.#gameTimer > 3000) {
            for (let i = 0; i < 7; i++) { // vortexes
                let v = new VortexLauncher((windowWidth - 2 * SPAWN_BORDER) * Math.random() + SPAWN_BORDER,
                    (windowHeight - 2 * SPAWN_BORDER) * Math.random() + SPAWN_BORDER,
                    0, 10000, int(Math.random() * 3 + 3), Math.random() * 4 + 2);

                vortexs.push(v);
            }

            // even droppers
            let dropper1 = new DropperLauncher(windowWidth / 2, 0, 0, 10000, createVector(0, 1));
            dropper1.bulletSpread = PI;
            let dropper2 = new DropperLauncher(windowWidth / 2, windowHeight, 0, 10000, createVector(0, -1));
            dropper2.bulletSpread = PI;
            let dropper3 = new DropperLauncher(0, windowHeight / 2, 0, 10000, createVector(1, 0));
            dropper3.bulletSpread = PI;
            let dropper4 = new DropperLauncher(windowWidth, windowHeight / 2, 0, 10000, createVector(-1, 0));
            dropper4.bulletSpread = PI;

            // drunk dropper
            for (let i = 0; i < 3; i++) {
                let dropper5 = new DropperLauncher((windowWidth - 2 * SPAWN_BORDER) * Math.random() + SPAWN_BORDER,
                    (windowHeight - 2 * SPAWN_BORDER) * Math.random() + SPAWN_BORDER, 0, 10000, createVector(1, 1));
                dropper5.bulletSpread = TWO_PI;
                droppers.push(dropper5);
            }

            droppers.push(dropper1);
            droppers.push(dropper2);
            droppers.push(dropper3);
            droppers.push(dropper4);

            this.#initializedStage = true;
        }

        if (this.#gameTimer > 35000) {
            this.setStage(5);
        }
    }

    // 6 screen droppers and randomly appearing shotguns
    updateStage5(dt) {
        if (!this.#initializedStage) {
            this.#initializedStage = true;
            this.#stageVariable = 0;
            this.spawnScreenDroppers(this.#dropperTTL);
        }
        this.#stageVariable += dt;

        if (this.#gameTimer < 40000 && this.#stageVariable > 5000) {
            this.#stageVariable = 0;
            let rx = random(SPAWN_BORDER, width - SPAWN_BORDER);
            let ry = random(SPAWN_BORDER, height - SPAWN_BORDER);
            while (sqrt(pow(player.x - rx, 2) + pow(player.y - ry, 2) <= SAFE_SPAWN_DISTANCE)) {
                rx = random(SPAWN_BORDER, width - SPAWN_BORDER);
                ry = random(SPAWN_BORDER, height - SPAWN_BORDER);
            }
            let shotgun = new ShotgunLauncher(rx, ry, 0, random(9, 14), 9);
            shotguns.push(shotgun);
        }
        else if (this.#gameTimer > 45000) {
            this.setStage(6);
        }
    }

    updateStage6(dt) { // announce the player has unlocked upgrade
        if (!this.#initializedStage) {
            this.#initializedStage = true;
            this.#stageVariable = 0;
            player.unlocked_sin = true;
        }
        let startTime = 1000;
        if (this.#gameTimer > startTime) {
            textAlign(CENTER, CENTER);
            fill(0, 255, 0, this.#start_alpha);
            if (this.#gameTimer < startTime + 200) {
                let h = Math.min(1, (this.#gameTimer - startTime) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else if (this.#gameTimer < startTime + 4100) {
                let h = Math.min(1, (this.#gameTimer - startTime) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else if (this.#gameTimer < startTime + 4200) {
                let h = Math.max(0, (startTime + 4200 - this.#gameTimer) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else {
                this.setStage(7);
            }

            if (this.#gameTimer > startTime + 3100) {
                textSize(48);
                this.#stageVariable = Math.max(0, this.#stageVariable - deltaTime / 1000 * 200);
                fill(255, 255, 255, int(Math.min(this.#start_alpha, this.#stageVariable)));
                text("Weapon Upgrade Unlocked!", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            }
            else if (this.#gameTimer > startTime + 100) {
                textSize(48);
                this.#stageVariable = Math.min(this.#start_alpha, this.#stageVariable + deltaTime / 1000 * 200);
                fill(255, 255, 255, int(Math.min(this.#start_alpha, this.#stageVariable)));
                text("Weapon Upgrade Unlocked!", GAME_WIDTH / 2, GAME_HEIGHT / 2)
            }
        }
    }
    updateStage7(dt) {
        let startTime = 1000;
        if (this.#gameTimer > startTime) {
            textAlign(CENTER, CENTER);
            fill(0, 255, 0, this.#start_alpha);
            if (this.#gameTimer < startTime + 200) {
                let h = Math.min(1, (this.#gameTimer - startTime) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else if (this.#gameTimer < startTime + 4100) {
                let h = Math.min(1, (this.#gameTimer - startTime) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else if (this.#gameTimer < startTime + 4200) {
                let h = Math.max(0, (startTime + 4200 - this.#gameTimer) / 100) * 200;
                rect(BORDER, (GAME_HEIGHT / 2 - h / 2) , GAME_WIDTH - BORDER * 2, h);
            }
            else {
                this.setStage(8);
            }

            if (this.#gameTimer > startTime + 3100) {
                textSize(48);
                this.#stageVariable = Math.max(0, this.#stageVariable - deltaTime / 1000 * this.#start_alpha);
                fill(255, 255, 255, int(Math.min(this.#start_alpha, this.#stageVariable)));
                text("Freeplay Mode Active", GAME_WIDTH / 2, GAME_HEIGHT / 2);
            }
            else if (this.#gameTimer > startTime + 100) {
                textSize(48);
                this.#stageVariable = Math.min(this.#start_alpha, this.#stageVariable + deltaTime / 1000 * 200);
                fill(255, 255, 255, int(Math.min(this.#start_alpha, this.#stageVariable)));
                text("Freeplay Mode Active", GAME_WIDTH / 2, GAME_HEIGHT / 2)
            }
        }
    }
    #dropperIndex = 0;
    #dropperTTL2 = 10000;
    #fp_dropper_start_fireSpeed = 120;
    #fp_random_item_spawn_timer = 10000;
    #fp_timer = 10000;
    updateStage8(dt) {
        if (!this.#initializedStage) {
            this.#initializedStage = true;
            this.#stageVariable = 0;
            this.spawnScreenDroppers(this.#dropperTTL2, this.#fp_dropper_start_fireSpeed);
        }

        this.#stageVariable += dt;
        this.#fp_timer += dt;
        if (this.#stageVariable > this.#dropperTTL2) {
            this.#stageVariable = 0;
            this.#dropperIndex++;
            this.spawnScreenDroppers(this.#dropperTTL2, max(this.#fp_dropper_start_fireSpeed - this.#dropperIndex * 10, 80));
        }

        if (this.#fp_timer > this.#fp_random_item_spawn_timer) {
            this.#fp_timer = 0;
            this.#fp_random_item_spawn_timer *= 0.85;
            this.#fp_random_item_spawn_timer = max(this.#fp_random_item_spawn_timer, 4000);
            let num = int(random(1, 3));
            for (let i = 0; i < num; i++) {
                let num2 = int(random(1, 3));
                let x = random(SPAWN_BORDER, width - SPAWN_BORDER);
                let y = random(SPAWN_BORDER, height - SPAWN_BORDER);
                let distance = sqrt(pow(player.x - x, 2) + pow(player.y - y, 2));
                console.log("Spawning a random launcher");
                while (distance < SAFE_SPAWN_DISTANCE) {
                    console.log("Launcher too close to player, re-rolling position");
                    x = random(SPAWN_BORDER, width - SPAWN_BORDER);
                    y = random(SPAWN_BORDER, height - SPAWN_BORDER);
                    distance = sqrt(pow(player.x - x, 2) + pow(player.y - y, 2))
                }
                switch (num2) {
                    case 1:
                        // create a random vortex
                        let v = new VortexLauncher(x, y, 0, 10000, int(random(1, 6)), int(random(2, 5)));
                        vortexs.push(v);
                        break;
                    case 2:
                        // create a random shotgun
                        let s = new ShotgunLauncher(x, y, 0, int(random(7, 13)), 10);
                        shotguns.push(s);
                        break;
                }
            }
        }
    }

    spawnScreenDroppers(TTL, dropperFireSpeed = 100) {
        // summon 6 droppers 2 up 2 down 1 left 1 right
        let dropper1 = new DropperLauncher(GAME_WIDTH / 4, 0, 0, TTL, createVector(0, 1));
        dropper1.bulletSpread = PI;
        dropper1.fire_speed = dropperFireSpeed;
        let dropper2 = new DropperLauncher(GAME_WIDTH * 3 / 4, 0, 0, TTL, createVector(0, 1));
        dropper2.bulletSpread = PI;
        dropper2.fire_speed = dropperFireSpeed;
        let dropper3 = new DropperLauncher(GAME_WIDTH / 4, GAME_HEIGHT, 0, TTL, createVector(0, -1));
        dropper3.bulletSpread = PI;
        dropper3.fire_speed = dropperFireSpeed;
        let dropper4 = new DropperLauncher(GAME_WIDTH * 3 / 4, GAME_HEIGHT, 0, TTL, createVector(0, -1));
        dropper4.bulletSpread = PI;
        dropper4.fire_speed = dropperFireSpeed;
        let dropper5 = new DropperLauncher(0, GAME_HEIGHT / 2, 0, TTL, createVector(1, 0));
        dropper5.bulletSpread = PI;
        dropper5.fire_speed = dropperFireSpeed;
        let dropper6 = new DropperLauncher(GAME_WIDTH, GAME_HEIGHT / 2, 0, TTL, createVector(-1, 0));
        dropper6.bulletSpread = PI;
        dropper6.fire_speed = dropperFireSpeed;


        droppers.push(dropper1);
        droppers.push(dropper2);
        droppers.push(dropper3);
        droppers.push(dropper4);
        droppers.push(dropper5);
        droppers.push(dropper6);
    }
    //#endregion
}