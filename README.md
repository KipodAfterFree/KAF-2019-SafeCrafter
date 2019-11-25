# SafeCrafter

SafeCrafter is an information security challenge in the Crypto category, and was presented to participants of [KAF CTF 2019](https://ctf.kipodafterfree.com)

## Challenge story

Craft your own secret safe today! Safe Crafter Consumer Edition (Link)

## Challenge exploit

Algorithm reversing

## Challenge solution

No need

## Building and installing

[Clone](https://github.com/NadavTasher/2019-HappyCake/archive/master.zip) the repository, then type the following command to build the container:
```bash
docker build . -t safecrafter
```

To run the challenge, execute the following command:
```bash
docker run --rm -d -p 1060:80 safecrafter
```

## Usage

You may now access the challenge interface through your browser: `http://localhost:1060`

## Flag

Flag is:
```flagscript
KAF{1_m3an_1ts_ju5t_4noth3r_s7up1d_d13tract1on}
```

## License
[MIT License](https://choosealicense.com/licenses/mit/)