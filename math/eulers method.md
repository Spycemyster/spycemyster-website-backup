---
layout: default
title:  Euler's Method
---
<div class="date">
Written On: September 6, 2021<br>
Last Updated: September 6, 2021
</div>
Euler's method is one of the simplest ways to approximate numerical solutions to first order differential equations. It uses lines to approximate the solution curve, which can be algorithmically applied to get an approximate value.

## Derivation
This is the form of an approximate solution for $$y$$.

$$ y=y_0 + \Delta y $$

$$y$$ is the desired value, $$y_0$$ is some initial value of curve, and $$\Delta y$$ is the linear approximated change in curve from that initial point to $$y$$ over some $$\Delta x$$.

From our understanding of derivatives, we know that $$\frac{dy}{dx} = \lim_{\Delta x \to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}$$

A derivative can be thought of as some really small change in the y axis divided by the really small change in the x axis. In math terms:

$$ \frac{dy}{dx} \approx \frac{\Delta y}{\Delta x} $$

Sometimes, $$\frac{dy}{dx}$$ isn't always known to us and we have to approximate it. But how do we numerically find $$dy$$ and $$dx$$? We can instead substitute $$\Delta y$$ and $$\Delta x$$ in instead through a linear approximation. 