var playfields = [
    "M-J's I-maze | 87,87,2F,87,87,87,87,87,87,87,87,87,2F,87,87,87,87,87,2F,87,87,87,2F,87,87,87,87,87,2F,87,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,87,87,2F,87,87,87,87,87,2F,87,87,87,87,87,2F,87,87,87,2F,87,87,87,87,87,2F,87,87,87,2F,87,87,87,2F,2F,2F,2F,2F,2F,2F,2F,87,87,87,87,2F,87,87,87,2F,87,87,87,87,87,2F,87,87,87,87,87",
    "Checkerboard | 84,2F,84,2F,84,2F,84,2F,84,2F,2F,84,2F,84,2F,84,2F,84,2F,84,84,2F,84,2F,84,2F,84,2F,84,2F,2F,84,2F,84,2F,84,2F,84,2F,84,84,2F,84,2F,84,2F,84,2F,84,2F,2F,84,2F,84,2F,84,2F,84,2F,84,84,2F,84,2F,84,2F,84,2F,84,2F,2F,84,2F,84,2F,84,2F,84,2F,84,84,2F,84,2F,84,2F,84,2F,84,2F,2F,84,2F,84,2F,84,2F,84,2F,84",
    "Toni | 10,1E,1D,0E,17,2F,1D,0A,10,2F,1D,18,17,12,24,2F,20,18,20,2F,0F,0A,1C,1D,2F,0E,12,17,2F,2F,16,0A,21,25,18,1E,1D,2F,2F,2F,11,0A,1D,1D,0E,1C,1D,2F,0D,1E,8A,8B,8B,8B,8B,8B,8F,2F,29,29,1C,18,2F,14,1B,0A,1C,1C,27,2F,7B,7B,7B,7B,7B,7B,7B,7B,7B,2F,B9,BA,BD,BE,F2,E9,EA,E5,E6,2F,BB,BC,BB,BC,BF,EB,EC,E7,E8,2F",
    "Disturbing the piece | CD,CD,CD,CD,CD,CD,2F,CD,CD,CD,8C,C9,CA,8C,8C,8C,2F,8C,8C,8C,8C,CB,CC,8C,8C,8C,2F,8C,8C,CE,D7,D7,D7,D7,D7,D7,2F,D7,D7,CF,7B,7B,7B,27,D8,B3,2F,D8,27,D0,7C,E9,EA,6F,D8,B5,2F,D8,D1,D2,7D,EB,EC,6F,D8,B5,2F,D8,D5,D6,7B,7B,7B,7B,D8,B5,2F,D8,D8,27,7C,29,29,29,D9,B5,2F,D8,BD,BE,7D,B7,B8,D9,B7,B4,2F,D8,BB,BC",
    "Slope to the right | 87,2F,2F,2F,2F,2F,2F,2F,2F,2F,87,87,2F,2F,2F,2F,2F,2F,2F,2F,87,87,87,2F,2F,2F,2F,2F,2F,2F,87,87,87,87,2F,2F,2F,2F,2F,2F,87,87,87,87,87,2F,2F,2F,2F,2F,87,87,87,87,87,87,2F,2F,2F,2F,87,87,87,87,87,87,87,2F,2F,2F,87,87,87,87,87,87,87,87,2F,2F,87,87,87,87,87,87,87,87,87,2F,87,87,87,87,87,87,87,87,87,2F",
    "Slope to the left | 2F,2F,2F,2F,2F,2F,2F,2F,2F,87,2F,2F,2F,2F,2F,2F,2F,2F,87,87,2F,2F,2F,2F,2F,2F,2F,87,87,87,2F,2F,2F,2F,2F,2F,87,87,87,87,2F,2F,2F,2F,2F,87,87,87,87,87,2F,2F,2F,2F,87,87,87,87,87,87,2F,2F,2F,87,87,87,87,87,87,87,2F,2F,87,87,87,87,87,87,87,87,2F,87,87,87,87,87,87,87,87,87,2F,87,87,87,87,87,87,87,87,87",
    "Column 4 garbage well | 28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28,28,28,28,2F,28,28,28,28,28,28",
    "Secret grade | 2F,87,86,87,82,82,87,84,87,82,87,2F,81,84,82,85,83,86,87,83,86,86,2F,82,84,87,80,84,85,82,85,83,80,2F,84,84,87,84,84,83,82,84,86,82,2F,87,83,87,85,81,84,85,86,87,87,2F,80,83,87,82,84,86,82,81,87,87,2F,82,82,80,86,87,80,85,80,83,86,2F,86,82,83,83,84,85,82,83,81,86,2F,84,82,83,80,81,81,85,81,82,84,2F",
    "Whatever pyramid | B3,2F,2F,2F,2F,2F,2F,2F,2F,B3,B5,2F,2F,2F,2F,2F,2F,2F,2F,B5,B5,2F,2F,2F,2F,2F,2F,2F,2F,B5,B5,2F,2F,2F,2F,2F,2F,2F,2F,B5,B5,2F,2F,2F,2F,2F,2F,2F,2F,B5,B5,2F,2F,2F,E5,E6,2F,2F,2F,B5,B5,2F,2F,2F,E7,E8,2F,2F,2F,B5,B5,2F,2F,2F,7B,7B,2F,2F,2F,B5,B5,2F,2F,7C,7C,7C,7C,2F,2F,B5,B4,2F,7D,7D,7D,7D,7D,7D,2F,B4",
    "Marios Castle | 80,2F,80,2F,80,2F,80,2F,80,2F,7B,7B,7B,7B,7B,7B,7B,7B,7B,2F,7C,7C,7C,7C,7C,7C,7C,7C,7C,2F,2F,7D,7D,2F,2F,AE,7D,7D,2F,2F,2F,7B,7B,2F,2F,AF,7B,7B,2F,2F,2F,7C,7C,7C,7C,7C,7C,7C,2F,2F,2F,7D,7D,7D,7D,7D,7D,7D,2F,2F,2F,7B,7B,2F,2F,C0,7B,7B,2F,2F,2F,7C,7C,2F,2F,C1,7C,7C,2F,2F,2F,7D,7D,7D,7D,7D,7D,7D,2F,2F",
    "T-spin maze | 85,2F,2F,85,2F,2F,85,2F,2F,85,85,85,85,85,85,85,85,2F,2F,2F,85,85,85,85,85,85,85,85,2F,85,2F,2F,2F,85,85,85,85,85,85,85,85,2F,85,85,85,85,85,85,85,85,85,85,85,85,2F,2F,2F,85,85,85,85,85,85,85,85,2F,85,85,85,85,85,85,85,85,2F,85,85,85,85,85,85,85,85,85,2F,85,85,85,85,85,85,85,85,85,2F,85,85,85,85,85",
    "CTEC | 38,39,39,39,39,39,39,39,3A,2F,3B,AD,0C,1D,0E,0C,AD,AD,3C,2F,3B,29,29,29,29,29,29,29,3C,2F,3B,AD,02,00,02,03,AD,AD,3C,2F,3B,29,29,29,29,29,29,29,3C,2F,3D,3E,3E,3E,3E,3E,3E,3E,3F,2F,B3,2F,B3,2F,B3,2F,B3,2F,B3,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B4,2F,B4,2F,B4,2F,B4,2F,B4,2F",
    "Alternating wells | 87,82,2F,80,85,80,83,82,80,82,81,81,2F,83,82,84,83,82,86,87,80,80,2F,80,87,87,83,82,87,83,86,87,2F,84,86,86,80,82,82,80,84,83,80,81,82,83,86,2F,80,85,87,81,80,82,86,81,82,2F,81,85,84,84,86,80,85,83,82,2F,84,87,86,85,83,85,86,84,82,2F,82,86,2F,83,86,84,83,83,83,85,80,85,2F,83,82,84,80,85,83,85,80,82",
    "Musical household | 2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,2F,B9,BA,B3,2F,2F,2F,2F,2F,2F,2F,DA,DB,B4,2F,2F,2F,2F,8A,8B,8B,8B,8B,8B,8B,8F,2F,2F,2F,88,7B,7B,7B,7B,88,2F,2F,2F,2F,88,7C,DE,DF,7C,88,2F,2F,2F,2F,89,7D,E0,E1,7D,89,2F,2F",
    "Soil | 8E,8E,8E,8E,8E,8E,8E,8E,8E,2F,39,39,39,39,39,39,39,39,39,2F,3E,3E,3E,3E,3E,3E,3E,3E,3E,2F,8E,8E,8E,8E,8E,8E,8E,8E,8E,2F,8D,8D,8D,8D,8D,8D,8D,8D,8D,2F,2C,2C,2C,2C,2C,2C,2C,2C,2C,2F,8D,8D,8D,8D,8D,8D,8D,8D,8D,2F,8E,8E,8E,8E,8E,8E,8E,8E,8E,2F,CD,CD,CD,CD,CD,CD,CD,CD,CD,2F,D7,D7,D7,D7,D7,D7,D7,D7,D7,2F",
    "Candles of death | D9,2F,D9,2F,D9,2F,D9,2F,D9,2F,B3,2F,B3,2F,B3,2F,B3,2F,B3,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B5,2F,B4,2F,B4,2F,B4,2F,B4,2F,B4,2F",
    "Birthday cake | 2F,2F,2F,2F,D9,2F,2F,2F,2F,2F,2F,2F,D9,2F,B3,2F,D9,2F,2F,2F,2F,2F,B3,2F,B5,2F,B3,2F,2F,2F,2F,2F,B5,2F,B5,2F,B5,2F,2F,2F,2F,2F,B5,2F,B5,2F,B5,2F,2F,2F,2F,2F,B5,2F,B5,2F,B5,2F,2F,2F,2F,61,48,48,48,48,48,63,2F,2F,61,48,48,48,48,48,48,48,63,2F,4A,2C,4B,11,0B,0D,4A,2C,4B,2F,4A,2C,4B,2F,27,2F,4A,2C,4B,2F",
    "Split Tetris to right-well | B3,80,B3,80,B3,80,B3,80,B3,2F,28,28,28,28,28,28,28,28,28,28,B5,88,B5,88,B5,88,B5,88,B5,2F,28,28,28,28,28,28,28,28,28,28,B5,88,B5,88,B5,88,B5,88,B5,2F,28,28,28,28,28,28,28,28,28,28,B5,88,B5,88,B5,88,B5,88,B5,2F,28,28,28,28,28,28,28,28,28,28,B5,88,B5,88,B5,88,B5,88,B5,2F,B4,89,B4,89,B4,89,B4,89,B4,2F",
    "Modern art | CD,CD,CD,CD,CD,CD,CD,CD,3A,2F,5D,5E,5D,5E,5D,5E,5D,5E,B3,2F,6D,6E,6D,6E,6D,6E,6D,6E,B5,2F,C9,CA,C9,CA,C9,CA,C9,CA,B5,2F,CB,CC,CB,CC,CB,CC,CB,CC,B5,2F,D7,D7,D7,D7,D7,D7,D7,D7,B5,2F,C9,61,62,62,62,62,62,63,B4,2F,61,62,62,62,62,62,62,62,63,2F,64,64,61,62,62,62,63,65,65,2F,64,64,64,29,29,29,65,65,65,2F",
    "Block | 2F,47,48,48,48,48,48,48,48,49,2F,4A,61,62,62,62,62,62,63,4B,2F,4A,64,30,31,31,31,32,65,4B,2F,4A,64,36,55,56,5A,37,65,4B,2F,4A,64,36,5B,80,5C,37,65,4B,2F,4A,64,36,5B,89,5C,37,65,4B,2F,4A,64,36,2D,4F,2E,37,65,4B,2F,4A,64,33,34,34,34,35,65,4B,2F,4A,66,69,69,69,69,69,6A,4B,2F,4C,4D,4D,4D,4D,4D,4D,4D,4E",
    "Tetris | 2F,8E,8E,8E,8E,8E,8E,8E,8E,8E,2F,CD,CD,CD,CD,CD,CD,CD,CD,CD,2F,C9,CA,8C,8C,8C,8C,8C,8C,8C,2F,CB,CC,8C,8C,8C,8C,8C,8C,8C,2F,8C,8C,8C,8C,8C,8C,8C,8C,CE,2F,D7,D7,D7,D7,D7,D7,D7,D7,CF,2F,29,29,29,29,29,29,29,29,D0,2F,1D,0E,1D,1B,12,1C,27,D1,D2,2F,29,D9,29,29,29,D9,29,D3,D4,2F,B8,B7,D8,B8,B7,B7,B8,D5,D6"
];