class ScratchCodeConverter {
    constructor() {
        this.initializeEventListeners();
        this.blockMappings = this.createBlockMappings();
    }

    initializeEventListeners() {
        const convertBtn = document.getElementById('convert-btn');
        const codeInput = document.getElementById('code-input');
        const exampleBtns = document.querySelectorAll('.example-btn');

        convertBtn.addEventListener('click', () => this.convertCode());
        
        // Enterキーでも変換実行
        codeInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.convertCode();
            }
        });

        // サンプルコードボタン
        exampleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.target.getAttribute('data-code').replace(/&#10;/g, '\n');
                codeInput.value = code;
                this.convertCode();
            });
        });
    }

    createBlockMappings() {
        return {
            // Motion blocks (English)
            'forward': { category: 'motion', template: '{value}歩動かす', type: 'motion' },
            'move': { category: 'motion', template: '{value}歩動かす', type: 'motion' },
            'turn_right': { category: 'motion', template: '右に{value}度回す', type: 'motion' },
            'turn_left': { category: 'motion', template: '左に{value}度回す', type: 'motion' },
            'goto': { category: 'motion', template: '{value}へ行く', type: 'motion' },
            'glide': { category: 'motion', template: '{value}秒で滑らせる', type: 'motion' },
            
            // Motion blocks (Japanese)
            '前に進む': { category: 'motion', template: '{value}歩動かす', type: 'motion' },
            '進む': { category: 'motion', template: '{value}歩動かす', type: 'motion' },
            '右に回る': { category: 'motion', template: '右に{value}度回す', type: 'motion' },
            '左に回る': { category: 'motion', template: '左に{value}度回す', type: 'motion' },
            '右回転': { category: 'motion', template: '右に{value}度回す', type: 'motion' },
            '左回転': { category: 'motion', template: '左に{value}度回す', type: 'motion' },
            'x座標を': { category: 'motion', template: 'x座標を{value}にする', type: 'motion' },
            'y座標を': { category: 'motion', template: 'y座標を{value}にする', type: 'motion' },
            '移動': { category: 'motion', template: '{value}へ移動', type: 'motion' },
            
            // Looks blocks (English)
            'say': { category: 'looks', template: '{value}と言う', type: 'looks' },
            'think': { category: 'looks', template: '{value}と考える', type: 'looks' },
            'show': { category: 'looks', template: '表示する', type: 'looks' },
            'hide': { category: 'looks', template: '隠す', type: 'looks' },
            'set_costume': { category: 'looks', template: 'コスチュームを{value}にする', type: 'looks' },
            'change_size': { category: 'looks', template: 'サイズを{value}ずつ変える', type: 'looks' },
            
            // Looks blocks (Japanese)
            '言う': { category: 'looks', template: '{value}と言う', type: 'looks' },
            '話す': { category: 'looks', template: '{value}と言う', type: 'looks' },
            '考える': { category: 'looks', template: '{value}と考える', type: 'looks' },
            '表示': { category: 'looks', template: '表示する', type: 'looks' },
            '表示する': { category: 'looks', template: '表示する', type: 'looks' },
            '隠す': { category: 'looks', template: '隠す', type: 'looks' },
            '隠れる': { category: 'looks', template: '隠す', type: 'looks' },
            'コスチューム': { category: 'looks', template: 'コスチュームを{value}にする', type: 'looks' },
            'サイズ': { category: 'looks', template: 'サイズを{value}にする', type: 'looks' },
            
            // Pen blocks (English)
            'pen_down': { category: 'pen', template: 'ペンを下ろす', type: 'pen' },
            'pen_up': { category: 'pen', template: 'ペンを上げる', type: 'pen' },
            'set_color': { category: 'pen', template: 'ペンの色を{value}にする', type: 'pen' },
            'set_size': { category: 'pen', template: 'ペンの太さを{value}にする', type: 'pen' },
            'stamp': { category: 'pen', template: 'スタンプ', type: 'pen' },
            
            // Pen blocks (Japanese)
            'ペンを下ろす': { category: 'pen', template: 'ペンを下ろす', type: 'pen' },
            'ペンを上げる': { category: 'pen', template: 'ペンを上げる', type: 'pen' },
            'ペン下': { category: 'pen', template: 'ペンを下ろす', type: 'pen' },
            'ペン上': { category: 'pen', template: 'ペンを上げる', type: 'pen' },
            'ペンの色': { category: 'pen', template: 'ペンの色を{value}にする', type: 'pen' },
            'ペンの太さ': { category: 'pen', template: 'ペンの太さを{value}にする', type: 'pen' },
            'スタンプ': { category: 'pen', template: 'スタンプ', type: 'pen' },
            '色を': { category: 'pen', template: 'ペンの色を{value}にする', type: 'pen' },
            '太さを': { category: 'pen', template: 'ペンの太さを{value}にする', type: 'pen' },
            
            // Control blocks (English)
            'repeat': { category: 'control', template: '{value}回繰り返す', type: 'control' },
            'forever': { category: 'control', template: 'ずっと', type: 'control' },
            'if': { category: 'control', template: 'もし{value}なら', type: 'control' },
            'wait': { category: 'control', template: '{value}秒待つ', type: 'control' },
            'stop': { category: 'control', template: 'すべてを止める', type: 'control' },
            
            // Control blocks (Japanese)
            '繰り返す': { category: 'control', template: '{value}回繰り返す', type: 'control' },
            '繰り返し': { category: 'control', template: '{value}回繰り返す', type: 'control' },
            'ずっと': { category: 'control', template: 'ずっと', type: 'control' },
            '永遠に': { category: 'control', template: 'ずっと', type: 'control' },
            'もし': { category: 'control', template: 'もし{value}なら', type: 'control' },
            '待つ': { category: 'control', template: '{value}秒待つ', type: 'control' },
            '止める': { category: 'control', template: 'すべてを止める', type: 'control' },
            '停止': { category: 'control', template: 'すべてを止める', type: 'control' },
            
            // Sound blocks (English)
            'play_sound': { category: 'sound', template: '{value}の音を鳴らす', type: 'sound' },
            'play_note': { category: 'sound', template: '{value}の音符を{duration}拍鳴らす', type: 'sound' },
            'set_volume': { category: 'sound', template: '音量を{value}にする', type: 'sound' },
            
            // Sound blocks (Japanese)
            '音を鳴らす': { category: 'sound', template: '{value}の音を鳴らす', type: 'sound' },
            '音符': { category: 'sound', template: '{value}の音符を鳴らす', type: 'sound' },
            '音量': { category: 'sound', template: '音量を{value}にする', type: 'sound' },
            
            // Variables (English)
            'set_var': { category: 'variables', template: '{name}を{value}にする', type: 'variables' },
            'change_var': { category: 'variables', template: '{name}を{value}ずつ変える', type: 'variables' },
            
            // Variables (Japanese)
            'を': { category: 'variables', template: '{name}を{value}にする', type: 'variables' },
            '変数': { category: 'variables', template: '{name}を{value}にする', type: 'variables' }
        };
    }

    convertCode() {
        const code = document.getElementById('code-input').value.trim();
        if (!code) {
            this.showError('コードを入力してください');
            return;
        }

        try {
            const blocks = this.parseCode(code);
            this.renderBlocks(blocks);
        } catch (error) {
            this.showError('コードの解析中にエラーが発生しました: ' + error.message);
        }
    }

    parseCode(code) {
        const lines = code.split('\n').map(line => line.trim()).filter(line => line);
        const blocks = [];
        let i = 0;

        while (i < lines.length) {
            const result = this.parseLine(lines, i);
            blocks.push(result.block);
            i = result.nextIndex;
        }

        return blocks;
    }

    parseLine(lines, index) {
        const line = lines[index];
        
        // コメント行をスキップ
        if (line.startsWith('#') || line.startsWith('//')) {
            return { block: null, nextIndex: index + 1 };
        }

        // インデントを取得
        const indent = this.getIndent(lines[index]);
        
        // 制御構造の処理
        if (line.includes('repeat(') || line.includes('for ') || line.includes('while ') || 
            line.includes('繰り返し') || line.includes('繰り返す') || line.includes('ずっと')) {
            return this.parseControlBlock(lines, index);
        }

        // 通常のコマンドの処理
        const block = this.parseCommand(line.trim());
        return { block, nextIndex: index + 1 };
    }

    parseControlBlock(lines, index) {
        const line = lines[index].trim();
        let command, value, nestedBlocks = [];
        
        if (line.includes('repeat(')) {
            const match = line.match(/repeat\((\d+)\):/);
            value = match ? match[1] : '10';
            command = 'repeat';
        } else if (line.includes('for ')) {
            const match = line.match(/for .+ in range\((\d+)\):/);
            value = match ? match[1] : '10';
            command = 'repeat';
        } else if (line.includes('繰り返し') || line.includes('繰り返す')) {
            // 日本語の繰り返し構文を解析
            const match = line.match(/(\d+)回/) || line.match(/(\d+)/) || line.match(/繰り返し\((\d+)\)/);
            value = match ? match[1] : '10';
            command = 'repeat';
        } else if (line.includes('ずっと')) {
            command = 'forever';
            value = '';
        }

        // ネストされたブロックを解析
        let i = index + 1;
        const baseIndent = this.getIndent(lines[index]);
        
        while (i < lines.length) {
            const currentIndent = this.getIndent(lines[i]);
            if (currentIndent <= baseIndent && lines[i].trim() !== '') {
                break;
            }
            
            if (lines[i].trim() !== '') {
                const result = this.parseLine(lines, i);
                if (result.block) {
                    nestedBlocks.push(result.block);
                }
                i = result.nextIndex;
            } else {
                i++;
            }
        }

        const block = {
            command,
            value,
            type: 'control',
            nested: nestedBlocks
        };

        return { block, nextIndex: i };
    }

    parseCommand(line) {
        // 日本語のコマンド解析を最初に行う
        for (const [key, mapping] of Object.entries(this.blockMappings)) {
            if (line.includes(key)) {
                // 数値パラメータを抽出
                const numberMatch = line.match(/(\d+)/);
                const value = numberMatch ? numberMatch[1] : '';
                
                // 文字列パラメータを抽出（「」で囲まれた部分）
                const stringMatch = line.match(/「([^」]+)」/) || line.match(/["']([^"']+)["']/);
                const stringValue = stringMatch ? stringMatch[1] : '';
                
                return {
                    command: key,
                    value: stringValue || value || '',
                    type: mapping.type
                };
            }
        }

        // 関数呼び出しの解析（英語）
        const functionMatch = line.match(/(\w+)\((.*?)\)/);
        if (functionMatch) {
            const [, funcName, params] = functionMatch;
            const paramValue = params.replace(/['"]/g, '');
            
            if (this.blockMappings[funcName]) {
                return {
                    command: funcName,
                    value: paramValue || '',
                    type: this.blockMappings[funcName].type
                };
            }
        }

        // 代入文の解析
        const assignMatch = line.match(/(\w+)\s*=\s*(.+)/);
        if (assignMatch) {
            const [, varName, value] = assignMatch;
            return {
                command: 'set_var',
                name: varName,
                value: value.replace(/['"]/g, ''),
                type: 'variables'
            };
        }

        // 日本語の代入文解析
        const japaneseAssignMatch = line.match(/(.+?)を(.+)にする/);
        if (japaneseAssignMatch) {
            const [, varName, value] = japaneseAssignMatch;
            return {
                command: 'set_var',
                name: varName.trim(),
                value: value.trim(),
                type: 'variables'
            };
        }

        // デフォルトブロック
        return {
            command: 'unknown',
            value: line,
            type: 'operators'
        };
    }

    getIndent(line) {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
    }

    renderBlocks(blocks) {
        const container = document.getElementById('blocks-container');
        container.innerHTML = '';

        if (blocks.length === 0) {
            container.innerHTML = '<div class="placeholder">ブロックが生成されませんでした</div>';
            return;
        }

        blocks.forEach(block => {
            if (block) {
                const blockElement = this.createBlockElement(block);
                container.appendChild(blockElement);
            }
        });
    }

    createBlockElement(block) {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block-container';

        const mainBlock = document.createElement('div');
        mainBlock.className = `scratch-block block-${block.type}`;
        
        // ブロックのテキスト生成
        const text = this.generateBlockText(block);
        mainBlock.textContent = text;

        blockDiv.appendChild(mainBlock);

        // ネストされたブロックの処理
        if (block.nested && block.nested.length > 0) {
            if (block.command === 'repeat') {
                mainBlock.className += ' repeat-block';
            }

            const nestedContainer = document.createElement('div');
            nestedContainer.className = 'nested-blocks';

            block.nested.forEach(nestedBlock => {
                const nestedElement = this.createBlockElement(nestedBlock);
                nestedContainer.appendChild(nestedElement);
            });

            blockDiv.appendChild(nestedContainer);

            // repeat ブロックの終了部分
            if (block.command === 'repeat') {
                const endBlock = document.createElement('div');
                endBlock.className = 'scratch-block repeat-end';
                endBlock.textContent = 'end';
                blockDiv.appendChild(endBlock);
            }
        }

        return blockDiv;
    }

    generateBlockText(block) {
        const mapping = this.blockMappings[block.command];
        
        if (mapping && mapping.template) {
            let text = mapping.template;
            text = text.replace('{value}', block.value || '');
            text = text.replace('{name}', block.name || '');
            text = text.replace('{duration}', block.duration || '0.5');
            return text;
        }

        // マッピングがない場合のデフォルト処理
        if (block.command === 'unknown') {
            return block.value;
        }

        return `${block.command}(${block.value || ''})`;
    }

    showError(message) {
        const container = document.getElementById('blocks-container');
        container.innerHTML = `<div class="error-message" style="color: #e74c3c; text-align: center; padding: 20px; font-weight: bold;">${message}</div>`;
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new ScratchCodeConverter();
    
    // 初期サンプル表示
    const initialCode = `forward(50)
turn_right(90)
pen_down()
repeat(4):
    forward(100)
    turn_right(90)
pen_up()

// 日本語版も試してみてください:
進む(50)
右に回る(90)
ペンを下ろす
4回繰り返し:
    進む(100)
    右に回る(90)
ペンを上げる`;
    
    document.getElementById('code-input').value = initialCode;
});

// エクスポート機能（将来の拡張用）
window.ScratchCodeConverter = ScratchCodeConverter;