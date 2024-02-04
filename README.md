# Choose a repository to clone by local configuration

## Usage

```bash
npm install -g @yjhtry/create-all
create-all clone
```

![demo](/screenshots/demo.gif)

## Config

you can create a `create-all.json` or `.create-all.json` in your home directory, and the content is like this:

```json
{
  "config": [
    {
      "title": "yjhtry",
      "description": "yjhtry's repository",
      "children": [
        {
          "title": "starter templates",
          "description": "Various starter templates for different projects",
          "children": [
            {
              "title": "node cli starter",
              "url": "https://github.com/yjhtry/starter-templates",
              "cloneType": "folder",
              "repoName": "node-cli-starter"
            }
          ]
        },
        {
          "title": "h5 starter base on vue3",
          "cloneType": "repo",
          "url": "https://github.com/yjhtry",
          "repoName": "vue-h5-starter"
        }
      ]
    }
  ]
}
```

## TODO

- [ ] Support `create-all clone repo url` command
