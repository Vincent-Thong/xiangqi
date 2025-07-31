# westzone

Design and Architecture
```
1. links in headerFooterManager.js use absolute file path (the url), so that regardless where the html located, links work.
```

The tournament management tie breaker rule as follow:  
These metrics are used as tie-breakers in the standings:  
1 Tournament Points are the primary sorting factor.  
2 If teams have the same Tournament Points, then Goals For (GF) is used as the first tie-breaker.  
3 If teams are still tied, the head-to-head result between the tied teams is used.  
4 Finally, if all of the above are tied, Goal Difference (GD) is used as the last tie-breaker.  
