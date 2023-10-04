## Start application
```docker-compose up -d```

## Test running application
```curl localhost:5555/api/ping```

### Metar
```curl localhost:5555/api/metar\?station=SAEZ```

### Spaceflight News
```curl localhost:5555/api/spaceflight_news```

### Random Quote
```curl localhost:5555/api/quote```

## Performance Testing
```cd perf```
```npm install```
```chmod +x run-scenario.sh```

### Load Testing Example
```./run-scenario.sh loadTesting/ping api```