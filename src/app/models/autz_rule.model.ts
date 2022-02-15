export class AutzRuleModel {
  roles!: Array<String>;
  service!: string;
  rule!: string;
  methods!: Array<String>;


  setRule(_rule: unknown) {
    const rule = _rule as AutzRuleModel;
    this.roles = rule.roles || [];
    this.service = rule.service || '';
    this.rule = rule.rule || '';
    this.methods = rule.methods || [];
  }
}
