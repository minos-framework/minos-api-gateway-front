export class RuleModel {
  service!: string;
  rule!: string;
  methods!: Array<String>;


  setRule(_rule: unknown) {
    const rule = _rule as RuleModel;
    this.service = rule.service || '';
    this.rule = rule.rule || '';
    this.methods = rule.methods || [];
  }
}
