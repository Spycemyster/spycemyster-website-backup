---
layout: default
title:  Derivatives
---
<div class="date">
Written On: April 2, 2021<br>
Last Updated: April 8, 2021
</div>
### Notes
-   $$\frac{dy}{dx}[f(x)]=f'(x)=(f(x))'=f' \to $$ Common notation for "Derivative of *f*"
-   Differentiability **implies** continuity
    -   If the derivative of a function exists someplace, then it is also continuous there.
    -   Continuity **does not imply** differentiability. You can have a continuous function, but not differentiable.
        -   Ex: Absolute value, cusp, [*Weierstrass Function*](https://en.wikipedia.org/wiki/Weierstrass_function "Wow...")

# Properties
### Constant Multiplier
Any constant multipliers can be carried outside of the derivative

$$ \frac{dy}{dx}[c \cdot f(x)] = c\cdot f'(x) $$

### Addition
Addition of multiple functions can be broken up into separate derivatives

$$ \frac{dy}{dx}[f(x) + g(x)] = f'(x) + g'(x)$$

### Subtraction
Subtraction of multiple functions can be broken up into separate derivatives

$$ \frac{dy}{dx}[f(x) - g(x)] = f'(x) - g'(x)$$

This one should be straightforward if you got the first two.

# Table of Derivatives
<details>
<summary>Click to View List of Common Derivatives</summary>
$$ \frac{dy}{dx}[c]=0 $$

$$ \frac{dy}{dx}[x^n]=nx^{n-1} $$

$$ \frac{dy}{dx}[c^x]=c^x \cdot ln(c) $$

$$ \frac{dy}{dx}[ln(x)]=\frac{1}{x} $$

$$ \frac{dy}{dx}[sin(x)]=cos(x) $$

$$ \frac{dy}{dx}[cos(x)]=-sin(x) $$

$$ \frac{dy}{dx}[tan(x)]=sec^2(x) $$

$$ \frac{dy}{dx}[csc(x)]=-csc(x)cot(x) $$

$$ \frac{dy}{dx}[sec(x)]=sec(x)tan(x) $$

$$ \frac{dy}{dx}[cot(x)]=-csc^2(x) $$

$$ \frac{dy}{dx}[sin^{-1}(x)]=\frac{1}{\sqrt(1-x^2)} $$

$$ \frac{dy}{dx}[cos^{-1}(x)]=\frac{-1}{\sqrt(1-x^2)} $$

$$ \frac{dy}{dx}[tan^{-1}(x)]=\frac{1}{1+x^2} $$

$$ \frac{dy}{dx}[csc^{-1}(x)]=\frac{-1}{|x|\sqrt(x^2-1)} $$

$$ \frac{dy}{dx}[sec^{-1}(x)]=\frac{-1}{|x|\sqrt(x^2-1)} $$

$$ \frac{dy}{dx}[cot^{-1}(x)]=\frac{-1}{1+x^2} $$

Most of the derivatives that you will run into can just be a composition of these derivatives and a composition of various derivative rules.
</details>

# Derivative Rules
It does.

### Product Rule
Two functions multiplied together can be differentiated by this formula

$$ \frac{dy}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$$

### Division Rule
A function *f* divided by another function *g* can be written as such:

$$ \frac{dy}{dx}[\frac{f(x)}{g(x)}] = \frac{f'(x)g(x)-f(x)g'(x)}{g(x)^2}$$

This can be much easily memorized by:
-   "Low D High Minus High D Low. All Over Low Squared"
    -   Low = Bottom Function *g*
    -   High = Top Function *f*
    -   D = Derivative of
    -   It helps to sing :musical_note:

### Chain Rule
The derivative of a *composition* of functions (function of a function) can be written as follows:

$$ \frac{dy}{dx}[f(g(x))] = f'(g(x))g'(x)$$

This might seem a bit daunting at first. But practice on recognizing which functions you can substitute for *g* and which is *f* and you'll be able to do these quite confidently.

Another way of looking at this is through what's called *u*-substitution

Let $$u=g(x) \to u'=g'(x)$$

$$\frac{df}{dx}=\frac{du}{dx} \cdot \frac{df}{du}$$

### Implicit Differentiation
Remember that taking the derivative of a function is just a mathematical operation. It's just like taking the log of both sides, dividing both sides, squaring both sides, etc. Because you can take the derivative of both sides of an equation, you can *implicitly* find a derivative by taking the derivative of both sides. This is best illustrated through examples:

#### Problem 1
Calculate the derivative of $$y=ln(x)$$ through implicit differentiation (Don't just lookup the derivative of ln(x)!)

#### Solution
<details>
<summary>Click to View Volution</summary>
$$e^y=e^{ln(x)}$$ (Raise both sides to the e power to cancel out the logarithm)

$$e^y=x$$ (These two functions look easy to differentiate)

$$\frac{d}{dx}[e^y=x]$$ (Take the derivative of both sides of the equation)

$$\frac{dy}{dx} \cdot e^y = 1$$ (This step is probably the most daunting. Just remember that this is just the *chain rule*. If we take the derivative of a function, we have to multiply it by the derivative of the inside. Hence, $$\frac{d}{dx}[e^y]=e^yy'$$)

$$\frac{dy}{dx}=\frac{1}{e^y}$$ (Divide both sides by $$e^y$$)

$$\frac{dy}{dx}=\frac{1}{x}$$ (Remember from the second step, $$e^y=x$$)

We're done! The derivative of $$ln(x)$$ is $$\frac{1}{x}$$
</details>

#### Problem 2
Calculate the $$\frac{dy}{dx}$$ from the following equation $$x^2+y^2=1$$

#### Solution
<details>
<summary>Click To View Solution</summary>
You might recognize that this is the equation for a circle with radius 1. (Think later about what the derivative means for this after we finish!)

$$\frac{d}{dx}[x^2+y^2=1]$$ (Implicit differentiation)

$$2x+2y\cdot \frac{dy}{dx}=0$$ (Derivative of Polynomial, Chain Rule, and Derivative of Constant)

$$2y \cdot \frac{dy}{dx}=-2x$$ (Move terms)

$$\frac{dy}{dx}=-\frac{2x}{2y}$$ (Move terms x2)

$$\frac{dy}{dx}=-\frac{x}{y}$$ (Simplify)

And we're done! The derivative of y is $$-\frac{x}{y}$$. What does this mean through? This means that the rate of change for a circle is dependent on both the x position and y position of the point.

</details>