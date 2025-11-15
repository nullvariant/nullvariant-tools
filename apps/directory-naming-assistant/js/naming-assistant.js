/**
 * Directory Naming Assistant
 * Based on universal naming principles designed for 100-year sustainability
 */

class NamingAssistant {
    constructor() {
        this.rules = this.getRulesData();
        this.currentTime = new Date();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayRules();
        this.displayExamples();
        this.updateTime();

        // 定期的な更新
        setInterval(() => this.updateTime(), 1000);
    }

    getRulesData() {
        return [
            {
                rule_number: 1,
                rule_name: "接頭辞規則",
                rule_name_en: "Prefix Rules",
                priority: 1,
                description: "アンダースコア始まり（_）→ システム構造ディレクトリ、ドット始まり（.）→ ツール設定ディレクトリ、ダブルアンダースコア（__）→ システム予約ディレクトリ",
                examples: ["_meta/", "_templates/", "_raw-exports/", ".vscode/", ".cursor/", ".claude/", "__pycache__/"],
                prefix_patterns: ["_", ".", "__"]
            },
            {
                rule_number: 2,
                rule_name: "時系列ディレクトリ",
                rule_name_en: "Chronological Directories",
                priority: 2,
                description: "YYYY/, MM/, DD/ → ISO 8601準拠の時系列構造。年月日のディレクトリは大文字で統一。",
                examples: ["2025/", "11/", "14/", "YYYY/", "MM/", "DD/"]
            },
            {
                rule_number: 3,
                rule_name: "国際標準・略語",
                rule_name_en: "International Standards & Abbreviations",
                priority: 3,
                description: "ISO 639-1言語コード（en/, ja/, zh/）、業界標準略語（prd/, i18n/, spec/, adr/）。確立された略語のみ使用。",
                examples: ["en/", "ja/", "zh/", "prd/", "i18n/", "spec/", "adr/"]
            },
            {
                rule_number: 4,
                rule_name: "業界慣習",
                rule_name_en: "Industry Conventions",
                priority: 4,
                description: "50年以上の歴史を持つ業界標準のディレクトリ名。エコシステム全体で広く採用されている慣習。",
                examples: ["src/", "lib/", "hooks/", "tests/", "docs/", "fixtures/", "utils/", "components/"]
            },
            {
                rule_number: 5,
                rule_name: "システム予約",
                rule_name_en: "System Reserved",
                priority: 5,
                description: "ツールやシステムが自動生成・管理するディレクトリ。変更不可。",
                examples: [".git/", "node_modules/", "__pycache__/", "tmp/", "cache/", "build/", ".next/"]
            },
            {
                rule_number: 6,
                rule_name: "ライフサイクル状態",
                rule_name_en: "Lifecycle States",
                priority: 6,
                description: "過去分詞形（archived/, implemented/, deprecated/）、形容詞（active/, permanent/）でライフサイクル状態を表現。",
                examples: ["archived/", "implemented/", "deprecated/", "completed/", "active/", "permanent/", "abandoned/"]
            },
            {
                rule_number: 7,
                rule_name: "機能カテゴリ",
                rule_name_en: "Functional Categories",
                priority: 7,
                description: "動詞原形（create/, validate/, export/）で機能を表現。単数形を使用。",
                examples: ["create/", "validate/", "export/", "import/", "update/", "generate/", "process/"]
            },
            {
                rule_number: 8,
                rule_name: "コンテンツタイプ",
                rule_name_en: "Content Types",
                priority: 8,
                description: "名詞複数形（materials/, issues/）または名詞単数形（governance/, content/）。可算名詞は複数形、不可算名詞は単数形。",
                examples: ["materials/", "issues/", "scripts/", "governance/", "content/", "log/"]
            },
            {
                rule_number: 9,
                rule_name: "頻度・属性",
                rule_name_en: "Frequency & Attributes",
                priority: 9,
                description: "頻度形容詞（daily/, monthly/, ondemand/）、公開性・属性（public/, private/, internal/）。",
                examples: ["daily/", "weekly/", "monthly/", "yearly/", "ondemand/", "public/", "private/", "internal/"]
            },
            {
                rule_number: 10,
                rule_name: "表記スタイル",
                rule_name_en: "Notation Style",
                priority: 10,
                description: "小文字（src/, lib/）、kebab-case（raw-exports/, ai-talks/）、UPPERCASE（時系列のみ）。エコシステム例外を除き小文字とkebab-caseを使用。",
                examples: ["src/", "lib/", "raw-exports/", "ai-talks/", "content-log/"]
            }
        ];
    }

    setupEventListeners() {
        // 名前検証
        const directoryNameInput = document.getElementById('directoryName');
        directoryNameInput.addEventListener('input', (e) => {
            this.validateDirectoryName(e.target.value);
        });

        // 用途選択による提案
        const purposeSelect = document.getElementById('purpose');
        purposeSelect.addEventListener('change', (e) => {
            this.generateSuggestions(e.target.value);
        });

        // ヘルプボタン
        document.getElementById('helpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').classList.remove('hidden');
        });

        // ヘルプモーダルを閉じる
        document.getElementById('closeHelp').addEventListener('click', () => {
            document.getElementById('helpModal').classList.add('hidden');
        });

        // モーダル外クリックで閉じる
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') {
                document.getElementById('helpModal').classList.add('hidden');
            }
        });

        // テーマ切り替え（将来的な拡張用）
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    displayRules() {
        const rulesList = document.getElementById('rulesList');
        
        this.rules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow';
            
            const priorityColor = this.getPriorityColor(rule.priority);
            
            ruleElement.innerHTML = `
                <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center space-x-3">
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full ${priorityColor} text-white text-sm font-bold">
                            ${rule.rule_number}
                        </span>
                        <div>
                            <h4 class="font-semibold text-gray-900">${rule.rule_name}</h4>
                            <p class="text-sm text-gray-500">${rule.rule_name_en}</p>
                        </div>
                    </div>
                    <span class="text-xs text-gray-400">優先度: ${rule.priority}</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">${rule.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${rule.examples.map(example => 
                        `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            <i class="fas fa-folder mr-1"></i>
                            ${example}
                        </span>`
                    ).join('')}
                </div>
            `;
            
            rulesList.appendChild(ruleElement);
        });
    }

    displayExamples() {
        const examplesList = document.getElementById('examplesList');
        
        const examples = [
            {
                name: 'システム構造',
                description: 'メタデータやテンプレートを管理',
                examples: ['_meta/', '_templates/', '_raw-exports/']
            },
            {
                name: '状態管理',
                description: 'プロジェクトのライフサイクル状態を表現',
                examples: ['implemented/', 'archived/', 'deprecated/', 'active/']
            },
            {
                name: '言語別',
                description: '国際化対応のための言語コード',
                examples: ['en/', 'ja/', 'zh/']
            },
            {
                name: '頻度管理',
                description: '実行頻度やタイミングを表現',
                examples: ['daily/', 'weekly/', 'monthly/', 'ondemand/']
            }
        ];

        examples.forEach(example => {
            const exampleElement = document.createElement('div');
            exampleElement.className = 'border border-gray-200 rounded-lg p-4';
            exampleElement.innerHTML = `
                <h4 class="font-semibold text-gray-900 mb-1">${example.name}</h4>
                <p class="text-sm text-gray-600 mb-3">${example.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${example.examples.map(ex => 
                        `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                            <i class="fas fa-folder mr-1"></i>
                            ${ex}
                        </span>`
                    ).join('')}
                </div>
            `;
            examplesList.appendChild(exampleElement);
        });
    }

    validateDirectoryName(name) {
        const validationIcon = document.getElementById('validationIcon');
        const validationResult = document.getElementById('validationResult');
        
        if (!name.trim()) {
            validationIcon.innerHTML = '';
            validationResult.classList.add('hidden');
            return;
        }

        const validation = this.analyzeDirectoryName(name);
        
        // アイコンを更新
        if (validation.isValid) {
            validationIcon.innerHTML = '<i class="fas fa-check-circle text-green-500"></i>';
        } else {
            validationIcon.innerHTML = '<i class="fas fa-exclamation-circle text-yellow-500"></i>';
        }

        // 結果を表示
        validationResult.classList.remove('hidden');
        validationResult.innerHTML = `
            <div class="p-4 rounded-lg ${validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                        <i class="fas ${validation.isValid ? 'fa-check-circle text-green-500' : 'fa-exclamation-triangle text-yellow-500'}"></i>
                    </div>
                    <div class="flex-1">
                        <h5 class="font-medium ${validation.isValid ? 'text-green-900' : 'text-yellow-900'}">
                            ${validation.isValid ? '有効なディレクトリ名です' : '警告'}
                        </h5>
                        <p class="text-sm ${validation.isValid ? 'text-green-700' : 'text-yellow-700'} mt-1">
                            ${validation.message}
                        </p>
                        ${validation.applicableRule ? `
                            <div class="mt-2 text-xs ${validation.isValid ? 'text-green-600' : 'text-yellow-600'}">
                                適用原則: ${validation.applicableRule.rule_number}. ${validation.applicableRule.rule_name}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    analyzeDirectoryName(name) {
        // 10の原則に基づいて検証
        for (const rule of this.rules) {
            const result = this.checkRuleCompliance(name, rule);
            if (result.matches) {
                return {
                    isValid: true,
                    message: result.message,
                    applicableRule: rule
                };
            }
        }

        // どの原則にも該当しない場合
        return {
            isValid: false,
            message: 'この名前は推奨される命名規則に従っていません。用途に応じた適切な名前を検討してください。',
            applicableRule: null
        };
    }

    checkRuleCompliance(name, rule) {
        // 接頭辞規則（第1優先）
        if (rule.rule_number === 1) {
            if (name.startsWith('_')) {
                return {
                    matches: true,
                    message: 'システム構造ディレクトリとして適切です（アンダースコア接頭辞）。'
                };
            }
            if (name.startsWith('.')) {
                return {
                    matches: true,
                    message: 'ツール設定ディレクトリとして適切です（ドット接頭辞）。'
                };
            }
            if (name.startsWith('__') && name.endsWith('__')) {
                return {
                    matches: true,
                    message: 'システム予約ディレクトリとして適切です（ダブルアンダースコア）。'
                };
            }
        }

        // 時系列規則（第2優先）
        if (rule.rule_number === 2) {
            if (/^\d{4}\/$/.test(name) || /^\d{2}\/$/.test(name)) {
                return {
                    matches: true,
                    message: '時系列ディレクトリとして適切です（ISO 8601準拠）。'
                };
            }
        }

        // 国際標準・略語（第3優先）
        if (rule.rule_number === 3) {
            const validStandards = ['en/', 'ja/', 'zh/', 'prd/', 'i18n/', 'spec/'];
            if (validStandards.includes(name)) {
                return {
                    matches: true,
                    message: '国際標準または業界標準略語として適切です。'
                };
            }
        }

        // 業界慣習（第4優先）
        if (rule.rule_number === 4) {
            const conventions = ['lib/', 'hooks/', 'tests/', 'docs/', 'fixtures/', 'utils/'];
            if (conventions.includes(name)) {
                return {
                    matches: true,
                    message: '業界標準のディレクトリ名として適切です。'
                };
            }
        }

        // ライフサイクル状態（第6優先）
        if (rule.rule_number === 6) {
            const pastParticiples = ['archived/', 'implemented/', 'deprecated/', 'completed/'];
            const adjectives = ['active/', 'inactive/'];
            const presentParticiples = ['running/', 'pending/'];
            
            if ([...pastParticiples, ...adjectives, ...presentParticiples].includes(name)) {
                return {
                    matches: true,
                    message: 'ライフサイクル状態を適切に表現しています。'
                };
            }
        }

        // 頻度属性（第7優先）
        if (rule.rule_number === 7) {
            const frequencies = ['daily/', 'weekly/', 'monthly/', 'yearly/', 'ondemand/'];
            if (frequencies.includes(name)) {
                return {
                    matches: true,
                    message: '頻度属性を適切に表現しています。'
                };
            }
        }

        // 公開性・属性（第8優先）
        if (rule.rule_number === 8) {
            const visibilities = ['public/', 'private/', 'internal/', 'permanent/', 'temporary/'];
            if (visibilities.includes(name)) {
                return {
                    matches: true,
                    message: '公開性・属性を適切に表現しています。'
                };
            }
        }

        // 機能カテゴリ（第9優先）
        if (rule.rule_number === 9) {
            const functions = ['generate/', 'validate/', 'process/', 'governance/', 'content/', 'operations/'];
            if (functions.includes(name)) {
                return {
                    matches: true,
                    message: '機能カテゴリを適切に表現しています。'
                };
            }
        }

        // 一般規則（第10優先）
        if (rule.rule_number === 10) {
            const general = ['adr/', 'issues/', 'materials/', 'drafts/'];
            if (general.includes(name)) {
                return {
                    matches: true,
                    message: '一般規則に従った適切な名前です。'
                };
            }
        }

        return { matches: false };
    }

    generateSuggestions(purpose) {
        const suggestionsDiv = document.getElementById('suggestions');
        
        if (!purpose) {
            suggestionsDiv.classList.add('hidden');
            return;
        }

        const suggestions = this.getSuggestionsByPurpose(purpose);
        
        suggestionsDiv.classList.remove('hidden');
        suggestionsDiv.innerHTML = `
            <div class="space-y-3">
                <h4 class="font-medium text-gray-900">提案される名前:</h4>
                ${suggestions.map(suggestion => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-folder text-gray-400"></i>
                            <span class="font-mono text-sm">${suggestion.name}/</span>
                        </div>
                        <button 
                            onclick="navigator.clipboard.writeText('${suggestion.name}')"
                            class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            title="コピー"
                        >
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                `).join('')}
                <div class="text-xs text-gray-500 mt-3">
                    クリックしてコピーできます
                </div>
            </div>
        `;
    }

    getSuggestionsByPurpose(purpose) {
        const suggestions = {
            'system': [
                { name: '_meta', description: 'システム構造' },
                { name: '_templates', description: 'システム構造' },
                { name: '_raw-exports', description: 'システム構造' }
            ],
            'status': [
                { name: 'implemented', description: '状態管理' },
                { name: 'archived', description: '状態管理' },
                { name: 'deprecated', description: '状態管理' },
                { name: 'active', description: '状態管理' }
            ],
            'frequency': [
                { name: 'daily', description: '頻度管理' },
                { name: 'weekly', description: '頻度管理' },
                { name: 'monthly', description: '頻度管理' },
                { name: 'ondemand', description: '頻度管理' }
            ],
            'category': [
                { name: 'generate', description: '機能カテゴリ' },
                { name: 'validate', description: '機能カテゴリ' },
                { name: 'process', description: '機能カテゴリ' },
                { name: 'governance', description: '機能カテゴリ' }
            ],
            'language': [
                { name: 'en', description: '言語別' },
                { name: 'ja', description: '言語別' },
                { name: 'zh', description: '言語別' }
            ],
            'timeline': [
                { name: '2025', description: '時系列' },
                { name: '11', description: '時系列' },
                { name: '14', description: '時系列' }
            ]
        };

        return suggestions[purpose] || [];
    }

    getPriorityColor(priority) {
        const colors = {
            1: 'bg-red-500',
            2: 'bg-orange-500',
            3: 'bg-yellow-500',
            4: 'bg-green-500',
            5: 'bg-blue-500',
            6: 'bg-indigo-500',
            7: 'bg-purple-500',
            8: 'bg-pink-500',
            9: 'bg-gray-500',
            10: 'bg-gray-400'
        };
        return colors[priority] || 'bg-gray-400';
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('ja-JP');
        document.getElementById('currentTime').textContent = timeString;
    }

    toggleTheme() {
        // 将来的なダークテーマ実装用
        console.log('テーマ切り替え（実装予定）');
    }

    showError(message) {
        // エラー表示用の汎用関数
        console.error(message);
        // TODO: ユーザー向けのエラー表示UIを実装
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new NamingAssistant();
});