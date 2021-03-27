---
layout: default
title:  SpyceLibrary (WIP)
---

#   SpyceLibrary
*SpyceLibrary* is a library for the [*Monogame*](https://www.monogame.net/ "Truly the stuff of magic...") framework. It follows the similar design patterns of the *Unity Game Engine* by implementing a component based game objects style of game development, rather than an object inheritance based system. It will also utilize a scene-based system for managing independent game states. The main purpose of this library is to increase productivity of games through the [*Monogame*](https://www.monogame.net/ "Truly the stuff of magic...") framework. This page will serve as the planning page for development of the library.

#  Base Classes
## GameObject
###    Fields
-   List \<GameComponent\> drawnComponents
    -   The list of all components in this game object that has draw functionality
-   List \<GameComponent\> updatedComponents
    -   The list of all components in this game object that has update functionality
-   List \<GameComponent\> components
    -   The list of all components in this game object
-   List\<string\> tags
    -   The list of all tags that can be used to identify the game object
-   bool isActive
    -   Whether this game object is currently active
-   List \<GameObject\> children
    -   List of all the children objects of this object node

### Constructor
-   GameObject(GameObject parent)
    -   Creates a new instance of a game object

### Member Methods
-   void Load(Initializer)
    -   Performs first time initialization on the game object. Loads/generates new assets, initializes any needed variables, etc. Recursively initializes the children game objects as well.
-   void Update(float)
    -   Updates the state of the game object based on the amount of time passed since the last update.
-   void Draw(SpriteBatch)
    -   Renders the contents of the game object to the screen
-   GameObject Clone()
    -   Returns a cloned version of this object
-   AddComponent(GameComponent)
    -   Adds a component to the list of components.
-   GetTransform()
    -   Returns the transform
-   SetActive(bool)
    -   Changes the activeness status of the game object
-   HasTag(string)
    -   Searches the game object for the given tag.
-   OnDestroy()
    -   Called when the object is going to be destroyed.

### Static Methods
-   Initialize(GameObject)
    -   Creates a clone of the GameObject and returns it
-   AddToScene(GameObject)
    -   Adds the given GameObject to the current scene
-   Destroy(GameObject)
    -   Marks the given GameObject for removal at the start of the next update

##  GameComponent
### Fields
-   GameObject holder
-   bool isEnabled

### Member Methods
-   T GetComponent<pre><T></pre>()
    -   Searches for a component of the given type
-   void Invoke(Function, float)
    -   Calls the function after a given amount of time has passed
-   void InvokeRepeating(Function, float, float)
    -   Calls the given function after a given amount of time and repeats based on an interval
-   void Update(float)
    -   Updates the state of the component based on the given delta time
-   void Draw()
    -   Called after the Update method. Draws the contents of the component to the screen
-   void onFocus()
    -   Called when the application gains or loses focus
-   void onDestroy()
    -   Called when the game object is being destroyed
-   void onEnable()
    -   Called when the script is being enabled
-   void Start()
    -   Called before Update has called and after the object is created

### Static Methods
-   void Destroy(GameObject)
    -   Removes the game object from the scene
-   void QueueDraw(GameObject, bool cameraEnabled)
    -   Queues the game object to be drawn
-   void QueueDraw(GameObject, uint drawOrder, bool cameraEnabled)
    -   Queues the game object to be drawn in a given draw order

##  GameScene
### Fields
-   string name
    -   The associated of the game scene. This is used to map between different scenes. Multiple scenes cannot have the same name.
-   GameObject root
    -   The root game object. All game objects are childed to this game object.
-   Queue<pre><DrawCall></pre>[] draws;

### Member Methods
### Static Methods

##  Transform
### Fields
### Member Methods
### Static Methods

##  Initializer
### Fields
### Member Methods
### Static Methods

#   Singletons

##  SceneManager (Singleton)
### Fields
### Member Methods
### Static Methods

##  InputManager (Singleton)
### Fields
### Member Methods
### Static Methods

##  Debug (Singleton)
### Fields
### Member Methods
### Static Methods

# Components

##  Camera
### Fields
### Member Methods
### Static Methods

##  TextureSprite
### Fields
### Member Methods
### Static Methods

##  PhysicsBody
### Fields
### Member Methods
### Static Methods